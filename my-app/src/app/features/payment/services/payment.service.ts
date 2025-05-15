import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventService } from '@features/Event/services/event.service';
import Stripe from 'stripe';
import { ParticipationStatus, PaymentStatus } from '@features/Participation/entities/participation.entity';
import { ParticipationRepository } from '@features/Participation/repositories/participation.repository';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private eventService: EventService,
    private participationRepository: ParticipationRepository
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16'
    });
  }

  async createPaymentIntent(eventId: string, userId: string) {
    // Vérifier si l'événement existe et si l'utilisateur peut s'inscrire
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new BadRequestException('Événement non trouvé');
    }

    // Vérifier si l'utilisateur n'est pas déjà inscrit
    const isRegistered = await this.eventService.isUserRegistered(eventId, userId);
    if (isRegistered) {
      throw new BadRequestException('Déjà inscrit à cet événement');
    }

    // Créer l'intention de paiement
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: event.price * 100, // Stripe utilise les centimes
      currency: 'eur',
      metadata: {
        eventId,
        userId
      }
    });

    return {
      clientSecret: paymentIntent.client_secret,
      amount: event.price
    };
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );

      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          await this.handleSuccessfulPayment(session);
          break;
        case 'payment_intent.succeeded':
          const { eventId, userId } = event.data.object.metadata;
          await this.eventService.registerParticipant(eventId, userId);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return { received: true };
    } catch (err) {
      console.error('Webhook Error:', err.message);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
  }

  async confirmPayment(eventId: string, userId: string, paymentIntentId: string) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      await this.eventService.registerParticipant(eventId, userId);
      return { success: true };
    }

    throw new BadRequestException('Paiement non confirmé');
  }

  async createCheckoutSession(eventId: string, userId: string) {
    // Vérifier si l'événement existe et si l'utilisateur peut s'inscrire
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new BadRequestException('Événement non trouvé');
    }

    // Vérifier si l'utilisateur n'est pas déjà inscrit
    const isRegistered = await this.eventService.isUserRegistered(eventId, userId);
    if (isRegistered) {
      throw new BadRequestException('Déjà inscrit à cet événement');
    }

    const session = await this.stripe.checkout.sessions.create({
      amount: event.price * 100, // Stripe utilise les centimes
      currency: 'eur',
      metadata: {
        eventId,
        userId
      },
      success_url: `${this.configService.get('FRONTEND_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/payment/cancel`
    });

    return {
      sessionId: session.id,
      amount: event.price
    };
  }

  private async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    // ... vérifications ...
    const participation = this.participationRepository.create({
      eventId: payment.event.id,
      participantId: payment.user.id,
      status: ParticipationStatus.APPROVED,
      payment_status: PaymentStatus.PAID,
      payment_intent_id: session.payment_intent as string
    });

    await this.participationRepository.save(participation);
  }
} 