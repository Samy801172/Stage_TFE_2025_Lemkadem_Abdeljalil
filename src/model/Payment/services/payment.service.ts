import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentTransactionStatus } from '../entities/payment.entity';
import { Event } from '../../Event/entities/event.entity';
import { User } from '../../User/entities/user.entity';
import { EventParticipation, ParticipationStatus, PaymentStatus } from '../../Event/entities/event-participation.entity';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { MoreThan, LessThan, In } from 'typeorm';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(EventParticipation)
    private readonly participationRepository: Repository<EventParticipation>,
    private readonly configService: ConfigService
  ) {
    // Initialisation de Stripe avec la clé secrète
    const stripeKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    
    if (!stripeKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
    }

    try {
      this.stripe = new Stripe(stripeKey.trim(), {
        apiVersion: '2025-02-24.acacia'
      });
      this.logger.log('✅ Stripe initialized successfully');
    } catch (error) {
      this.logger.error('❌ Stripe initialization error:', error);
      throw error;
    }
  }

  /**
   * Crée une session de paiement Stripe pour un événement
   * @param eventId - ID de l'événement
   * @param userId - ID de l'utilisateur
   * @param isAdmin - Indique si l'utilisateur est admin (pour contourner certaines vérifications)
   * @returns URL de la session de paiement Stripe
   */
  async createPaymentSession(eventId: string, userId: string, isAdmin: boolean = false): Promise<string> {
    try {
      // 1. Récupération de l'événement et de l'utilisateur
      const event = await this.eventRepository.findOne({ where: { id: eventId } });
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!event || !user) {
        throw new Error('Event or user not found');
      }

      // 2. Vérification des droits administrateur
      const isAdminUser = isAdmin || user.type_user === 'ADMIN';
      this.logger.log(`👤 Création de session par ${isAdminUser ? 'ADMIN' : 'USER'}: ${user.email}`);

      // 3. Vérification de la participation existante
      const existingParticipation = await this.participationRepository.findOne({
        where: {
          event: { id: eventId },
          participant: { id: userId }
        }
      });

      // 4. Vérification si le paiement n'est pas déjà effectué
      const completedPayment = await this.paymentRepository.findOne({
        where: {
          event: { id: eventId },
          user: { id: userId },
          status: PaymentTransactionStatus.COMPLETED
        }
      });

      if (completedPayment && !isAdminUser) {
        this.logger.warn(`❌ L'utilisateur a déjà payé pour cet événement: ${event.title}`);
        throw new Error('Vous avez déjà payé pour cet événement');
      }

      // 5. Vérification des places disponibles (seulement si nouvelle participation)
      if (!existingParticipation) {
        const participantCount = await this.participationRepository.count({
          where: { event: { id: eventId } }
        });

        if (participantCount >= event.max_participants && !isAdminUser) {
          this.logger.warn(`❌ L'événement est complet: ${event.title}`);
          throw new Error('Cet événement est complet');
        }
      }

      // 6. Nettoyage des anciennes sessions de paiement expirées
      await this.cleanupExpiredSessions(userId);

      // 7. Vérification des sessions de paiement en cours
      const pendingPayment = await this.paymentRepository.findOne({
        where: {
          event: { id: eventId },
          user: { id: userId },
          status: PaymentTransactionStatus.PENDING,
          createdAt: MoreThan(new Date(Date.now() - 30 * 60 * 1000)) // Sessions de moins de 30 minutes
        }
      });

      if (pendingPayment && !isAdminUser) {
        this.logger.warn(`⚠️ Une session de paiement est déjà en cours`);
        throw new Error('Vous avez déjà une session de paiement en cours. Veuillez la terminer ou attendre qu\'elle expire.');
      }

      // 8. Création de la session Stripe
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: event.title,
                description: event.description
              },
              unit_amount: Math.round(event.price * 100)
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${this.configService.get('FRONTEND_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('FRONTEND_URL')}/events`,
        customer_email: user.email,
        expires_at: Math.floor(Date.now() / 1000) + 1800 // Session expire dans 30 minutes
      });

      // 9. Enregistrement du paiement en base de données
      const reference = `${event.id.substring(0, 6)}-${user.id.substring(0, 6)}-${Date.now().toString().substring(9, 13)}`;
      
      const payment = this.paymentRepository.create({
        event,
        user,
        amount: event.price,
        status: PaymentTransactionStatus.PENDING,
        transaction_id: session.id,
        payment_method: 'stripe',
        reference: reference // Référence unique pour le suivi
      });

      await this.paymentRepository.save(payment);
      
      this.logger.log(`✅ Payment session created for ${user.email} with reference ${reference}: ${session.url}`);
      
      return session.url; // Retourne l'URL de paiement Stripe
    } catch (error) {
      this.logger.error(`❌ Error creating payment session: ${error.message}`);
      throw error;
    }
  }

  /**
   * Nettoie les sessions de paiement expirées d'un utilisateur
   * @param userId - ID de l'utilisateur
   */
  private async cleanupExpiredSessions(userId: string): Promise<void> {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    await this.paymentRepository.delete({
      user: { id: userId },
      status: PaymentTransactionStatus.PENDING,
      createdAt: LessThan(thirtyMinutesAgo)
    });
  }

  /**
   * Gère les webhooks Stripe (notifications de paiement)
   * @param signature - Signature du webhook Stripe
   * @param rawBody - Corps de la requête brut
   */
  async handleWebhook(signature: string, rawBody: Buffer) {
    try {
      // 1. Vérification de base
      if (!rawBody) {
        this.logger.error('❌ Pas de corps de requête');
        return { received: false, error: 'No request body' };
      }

      // 2. Log du payload reçu pour debug
      const payload = JSON.parse(rawBody.toString());
      this.logger.log(`🔔 Webhook reçu: ${payload.type} - ID: ${payload.id}`);

      // 3. Vérification de la signature uniquement pour les événements de production
      const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
      let event;

      if (payload.livemode === true && webhookSecret) {
        try {
          event = this.stripe.webhooks.constructEvent(
            rawBody,
            signature,
            webhookSecret
          );
        } catch (err) {
          this.logger.error(`❌ Erreur de signature: ${err.message}`);
          return { received: false, error: 'Invalid signature' };
        }
      } else {
        // En mode test, on accepte sans vérification
        event = payload;
        this.logger.log('ℹ️ Mode test détecté - signature ignorée');
      }

      // 4. Traitement des événements
      switch (event.type) {
        case 'checkout.session.completed':
          this.logger.log(`💰 Traitement du paiement réussi - Session ID: ${event.id}`);
          await this.handleSuccessfulPayment(event.data.object);
          break;

        case 'checkout.session.expired':
          this.logger.log(`⏰ Session expirée - Session ID: ${event.id}`);
          await this.handleExpiredSession(event.data.object);
          break;

        case 'payment_intent.payment_failed':
          this.logger.log(`❌ Échec du paiement - Intent ID: ${event.id}`);
          await this.handlePaymentFailure(event.data.object.id);
          break;

        default:
          this.logger.debug(`ℹ️ Événement ignoré: ${event.type} - ID: ${event.id}`);
          break;
      }

      return { received: true, type: event.type };
    } catch (err) {
      this.logger.error(`❌ Erreur webhook: ${err.message}`, err.stack);
      // On retourne quand même 200 pour éviter les retries de Stripe
      return { received: false, error: err.message };
    }
  }

  /**
   * Gère un paiement réussi
   * @param session - Session Stripe complétée
   */
  private async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    try {
      // 1. Vérification si c'est une session de test
      const isTestSession = session.id.startsWith('cs_test_');
      
      // 2. Récupération du paiement
      const payment = await this.paymentRepository.findOne({
        where: { transaction_id: session.id },
        relations: ['event', 'user']
      });

      if (!payment) {
        if (isTestSession) {
          this.logger.log(`ℹ️ Session de test détectée: ${session.id}`);
          return { received: true };
        } else {
          this.logger.error(`❌ Paiement non trouvé pour la session: ${session.id}`);
          return;
        }
      }

      // 3. Mise à jour du statut du paiement
      payment.status = PaymentTransactionStatus.COMPLETED;
      payment.completedAt = new Date();
      await this.paymentRepository.save(payment);

      // 4. Mise à jour de la participation
      let participation = await this.participationRepository.findOne({
        where: {
          eventId: payment.event.id,
          participantId: payment.user.id
        }
      });

      if (!participation) {
        // Création d'une nouvelle participation si nécessaire
        participation = this.participationRepository.create({
          eventId: payment.event.id,
          participantId: payment.user.id,
          status: ParticipationStatus.APPROVED,
          payment_status: PaymentStatus.PAID,
          payment_intent_id: session.payment_intent as string
        });
      } else {
        // Mise à jour de la participation existante
        participation.status = ParticipationStatus.APPROVED;
        participation.payment_status = PaymentStatus.PAID;
        participation.payment_intent_id = session.payment_intent as string;
      }

      await this.participationRepository.save(participation);
      this.logger.log(`✅ Paiement complété pour: ${payment.user.email}`);
    } catch (error) {
      this.logger.error(`❌ Erreur lors du traitement du paiement réussi: ${error.message}`);
    }
  }

  /**
   * Gère une session de paiement expirée
   * @param session - Session Stripe expirée
   */
  private async handleExpiredSession(session: Stripe.Checkout.Session) {
    const payment = await this.paymentRepository.findOne({
      where: { transaction_id: session.id }
    });

    if (payment) {
      payment.status = PaymentTransactionStatus.FAILED;
      await this.paymentRepository.save(payment);
      this.logger.warn(`⚠️ Session expirée pour: ${payment.transaction_id}`);
    }
  }

  /**
   * Gère un paiement réussi (appelé après confirmation)
   * @param paymentIntentId - ID de l'intention de paiement Stripe
   */
  async handlePaymentSuccess(paymentIntentId: string): Promise<void> {
    try {
      const participation = await this.participationRepository.findOne({
        where: { payment_intent_id: paymentIntentId }
      });

      if (!participation) {
        throw new NotFoundException('Participation non trouvée');
      }

      participation.status = ParticipationStatus.APPROVED;
      participation.payment_status = PaymentStatus.PAID;

      await this.participationRepository.save(participation);
      
      this.logger.log(`✅ Paiement validé pour la participation: ${participation.id}`);
    } catch (error) {
      this.logger.error(`Erreur lors du traitement du paiement: ${error.message}`);
      throw error;
    }
  }

  /**
   * Gère un échec de paiement
   * @param paymentIntentId - ID de l'intention de paiement Stripe
   */
  async handlePaymentFailure(paymentIntentId: string): Promise<void> {
    try {
      const participation = await this.participationRepository.findOne({
        where: { payment_intent_id: paymentIntentId }
      });

      if (!participation) {
        throw new NotFoundException('Participation non trouvée');
      }

      participation.payment_status = PaymentStatus.FAILED;
      await this.participationRepository.save(participation);
      
      this.logger.warn(`⚠️ Échec du paiement pour la participation: ${participation.id}`);
    } catch (error) {
      this.logger.error(`Erreur lors du traitement de l'échec du paiement: ${error.message}`);
      throw error;
    }
  }

  /**
   * Simule un paiement réussi (pour les tests)
   * @param eventId - ID de l'événement
   * @param userId - ID de l'utilisateur
   */
  async simulateSuccessfulPayment(eventId: string, userId: string) {
    try {
      // 1. Mise à jour de la participation
      let participation = await this.participationRepository.findOne({
        where: {
          eventId,
          participantId: userId
        }
      });

      if (!participation) {
        throw new NotFoundException('Participation non trouvée');
      }

      participation.status = ParticipationStatus.CONFIRMED;
      participation.payment_status = PaymentStatus.PAID;
      participation.payment_intent_id = `pi_simulated_${Date.now()}`;
      
      await this.participationRepository.save(participation);

      // 2. Création d'un paiement simulé
      const event = await this.eventRepository.findOne({ where: { id: eventId } });
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!event || !user) {
        throw new NotFoundException('Événement ou utilisateur non trouvé');
      }

      const payment = this.paymentRepository.create({
        event,
        user,
        amount: event.price,
        status: PaymentTransactionStatus.COMPLETED,
        transaction_id: `cs_simulated_${Date.now()}`,
        payment_method: 'stripe',
        reference: `DEV-${eventId.substring(0, 6)}-${Date.now()}`,
        completedAt: new Date()
      });

      await this.paymentRepository.save(payment);

      this.logger.log(`✅ Simulation de paiement réussie pour l'événement: ${eventId}`);

      return {
        participation,
        payment
      };
    } catch (error) {
      this.logger.error(`❌ Erreur lors de la simulation du paiement: ${error.message}`);
      throw error;
    }
  }

  /**
   * Rembourse le paiement Stripe d'une participation à un événement
   * @param eventId - ID de l'événement
   * @param participantId - ID du participant
   */
  async refundParticipationPayment(eventId: string, participantId: string): Promise<void> {
    const payment = await this.paymentRepository.findOne({
      where: {
        event: { id: eventId },
        user: { id: participantId },
        status: PaymentTransactionStatus.COMPLETED
      }
    });
    if (!payment) throw new NotFoundException('Paiement non trouvé');

    // 2. Vérifier que le paiement a bien un ID Stripe (transaction_id)
    if (!payment.transaction_id) {
      throw new NotFoundException('Aucun ID de transaction Stripe trouvé pour ce paiement');
    }

    // 3. Rembourser via Stripe
    try {
      // On récupère la session Stripe pour obtenir le payment_intent
      const session = await this.stripe.checkout.sessions.retrieve(payment.transaction_id);
      if (!session.payment_intent) {
        throw new Error('Aucun payment_intent trouvé dans la session Stripe');
      }

      // On effectue le remboursement
      const refund = await this.stripe.refunds.create({
        payment_intent: session.payment_intent as string
      });

      if (refund.status === 'succeeded') {
        // 4. Mettre à jour le statut du paiement en base
        payment.status = PaymentTransactionStatus.REFUNDED;
        await this.paymentRepository.save(payment);
        this.logger.log(`✅ Remboursement Stripe effectué pour le paiement ${payment.id} (participant: ${participantId}, event: ${eventId})`);
      } else {
        throw new Error(`Le remboursement Stripe n'a pas réussi: ${refund.status}`);
      }
    } catch (err) {
      this.logger.error(`Erreur lors du remboursement Stripe: ${err.message}`);
      throw err;
    }
  }

  /**
   * Met à jour le statut d'un paiement pour un participant et un événement
   */
  async updatePaymentStatus(eventId: string, participantId: string, status: PaymentTransactionStatus): Promise<void> {
    const payment = await this.paymentRepository.findOne({
      where: {
        event: { id: eventId },
        user: { id: participantId },
        status: In([PaymentTransactionStatus.COMPLETED, PaymentTransactionStatus.REFUNDED])
      }
    });

    if (!payment) {
      throw new NotFoundException('Paiement non trouvé pour ce participant et cet événement');
    }

    payment.status = status;
    await this.paymentRepository.save(payment);
    this.logger.log(`✅ Statut du paiement mis à jour à ${status} pour le paiement ${payment.id}`);
  }

  async refundAllPaymentsForEvent(eventId: string): Promise<void> {
    const result = await this.paymentRepository
      .createQueryBuilder()
      .update(Payment)
      .set({ status: PaymentTransactionStatus.REFUNDED })
      .where('eventId = :eventId', { eventId })
      .andWhere('status = :status', { status: PaymentTransactionStatus.COMPLETED })
      .execute();
    console.log('Paiements mis à jour:', result.affected);
  }
} 