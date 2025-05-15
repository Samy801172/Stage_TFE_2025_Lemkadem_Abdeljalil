import { Injectable, Logger, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { EventParticipation, ParticipationStatus, PaymentStatus } from '../entities/event-participation.entity';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { CreateParticipationDto } from '../dto/create-participation.dto';
import { ParticipationResponseDto } from '../dto/participation-response.dto';
import { EventWithCalendarDto } from '../dto/event-with-calendar.dto';
import { PaymentService } from '../../Payment/services/payment.service';
import { PaymentTransactionStatus } from '../../Payment/entities/payment.entity';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(EventParticipation)
    private participationRepository: Repository<EventParticipation>,
    private readonly paymentService: PaymentService
  ) {}

  // Méthode pour récupérer tous les événements
  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find({
      relations: ['organizer', 'participations']
    });
  }

  // Méthode pour créer un événement
  async create(createEventDto: CreateEventDto, organizerId: string): Promise<Event> {
    // Vérifier si un événement existe déjà à cette date et ce lieu (uniquement si non annulé)
    const existingEvent = await this.eventRepository.findOne({
      where: {
        date: createEventDto.date,
        location: createEventDto.location,
        is_cancelled: false // On ne bloque que si un événement actif existe
      }
    });

    if (existingEvent) {
      throw new ForbiddenException(
        'Un événement existe déjà à cette date et ce lieu'
      );
    }

    const event = this.eventRepository.create({
      ...createEventDto,
      organizer: { id: organizerId }
    });

    return await this.eventRepository.save(event);
  }

  // Méthode pour trouver un événement par ID
  async findOne(id: string): Promise<Event> {
    return await this.eventRepository.findOne({
      where: { id },
      relations: ['organizer', 'participations']
    });
  }

  // Méthode pour mettre à jour un événement
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.eventRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  // Méthode pour supprimer un événement
  async remove(id: string, userId: string, userRole: string): Promise<void> {
    this.logger.debug(`Tentative de suppression de l'événement ${id} par l'utilisateur ${userId}`);

    // 1. Vérifier que l'événement existe
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organizer', 'participations']
    });

    if (!event) {
      this.logger.warn(`Tentative de suppression d'un événement inexistant: ${id}`);
      throw new NotFoundException('Événement non trouvé');
    }

    // 2. Vérifier que l'utilisateur est l'organisateur ou un admin
    if (event.organizer.id !== userId && userRole !== 'ADMIN') {
      this.logger.warn(`Tentative de suppression non autorisée par l'utilisateur ${userId}`);
      throw new ForbiddenException('Vous n\'êtes pas autorisé à supprimer cet événement');
    }

    // 3. Vérifier qu'il n'y a pas de participants inscrits
    if (event.participations && event.participations.length > 0) {
      this.logger.warn(`Tentative de suppression d'un événement avec des participants: ${id}`);
      throw new ForbiddenException('Impossible de supprimer un événement avec des participants inscrits');
    }

    // 4. Supprimer l'événement
    try {
      await this.eventRepository.delete(id);
      this.logger.log(`Événement ${id} supprimé avec succès par l'utilisateur ${userId}`);
    } catch (error) {
      this.logger.error(`Erreur lors de la suppression de l'événement ${id}: ${error.message}`);
      throw error;
    }
  }

  // Méthode pour participer à un événement
  async participate(data: CreateParticipationDto): Promise<ParticipationResponseDto> {
    const event = await this.eventRepository.findOne({
      where: { id: data.eventId },
      relations: ['participations']
    });

    if (!event) {
      throw new NotFoundException('Événement non trouvé');
    }

    // Vérifier si l'utilisateur n'est pas déjà inscrit
    const existingParticipation = event.participations.find(
      p => p.participantId === data.participantId
    );

    if (existingParticipation) {
      throw new ConflictException('Déjà inscrit à cet événement');
    }

    // Vérifier si l'événement n'est pas complet
    if (event.participations.length >= event.max_participants) {
      throw new ConflictException('Événement complet');
    }

    // Créer la participation
    const participation = this.participationRepository.create({
      eventId: data.eventId,
      participantId: data.participantId,
      status: ParticipationStatus.PENDING,
      payment_status: event.price > 0 ? PaymentStatus.PENDING : PaymentStatus.FREE
    });

    const savedParticipation = await this.participationRepository.save(participation);

    return {
      message: 'Participation créée avec succès',
      participation: savedParticipation
    };
  }

  // Méthode pour les événements à venir
  async getUpcomingEvents(): Promise<Event[]> {
    try {
      const currentDate = new Date();
      const events = await this.eventRepository
        .createQueryBuilder('event')
        .leftJoinAndSelect('event.organizer', 'organizer')
        .where('event.date > :currentDate', { currentDate })
        .andWhere('event.is_cancelled = :isCancelled', { isCancelled: false })
        .orderBy('event.date', 'ASC')
        .getMany();

      this.logger.debug(`Found ${events.length} upcoming events`);
      return events;
    } catch (error) {
      this.logger.error(`Failed to get upcoming events: ${error.message}`);
      throw error;
    }
  }

  // Méthode pour les événements auxquels un utilisateur est inscrit
  async getRegisteredEvents(userId: string): Promise<EventWithCalendarDto[]> {
    try {
      this.logger.debug(`Getting registered events for user: ${userId}`);
      
      const participations = await this.participationRepository
        .createQueryBuilder('participation')
        .leftJoinAndSelect('participation.event', 'event')
        .leftJoinAndSelect('event.organizer', 'organizer')
        .where('participation.participantId = :userId', { userId })
        .orderBy('event.date', 'ASC')
        .getMany();

      const eventsWithCalendar = participations.map(participation => {
        return new EventWithCalendarDto(participation.event, participation);
      });

      this.logger.debug(`Found ${eventsWithCalendar.length} registered events for user ${userId}`);
      return eventsWithCalendar;
    } catch (error) {
      this.logger.error(`Failed to get registered events: ${error.message}`);
      throw error;
    }
  }

  async approveParticipation(participationId: string): Promise<EventParticipation> {
    try {
      const participation = await this.participationRepository.findOne({
        where: { id: participationId }
      });

      if (!participation) {
        throw new NotFoundException('Participation non trouvée');
      }

      participation.status = ParticipationStatus.APPROVED;
      
      return await this.participationRepository.save(participation);
    } catch (error) {
      this.logger.error(`Erreur lors de l'approbation de la participation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Annule un événement (soft delete), notifie et rembourse les participants si besoin
   */
  async cancelEvent(id: string): Promise<{ success: boolean; message: string }> {
    // 1. Chercher l'événement avec ses participations et les infos participants
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['participations', 'participations.participant']
    });
    if (!event) {
      throw new NotFoundException('Événement non trouvé');
    }

    // 2. Mettre à jour le champ is_cancelled
    event.is_cancelled = true;
    await this.eventRepository.save(event);

    // 3. Parcourir les participations pour notifier et rembourser si besoin
    for (const participation of event.participations) {
      // a) Notifier le participant (exemple: console.log, à remplacer par un service d'email)
      console.log(
        `Notification: Cher ${participation.participant?.email || participation.participantId}, l'événement "${event.title}" a été annulé.`
      );

      // b) Si le participant a payé, lancer le remboursement Stripe via PaymentService
      if (participation.payment_status === PaymentStatus.PAID) {
        try {
          // Effectuer le remboursement Stripe
          await this.paymentService.refundParticipationPayment(event.id, participation.participantId);
          
          // Mettre à jour le statut de participation à REFUNDED
          participation.payment_status = PaymentStatus.REFUNDED;
          await this.participationRepository.save(participation);
          
          this.logger.log(`✅ Remboursement effectué pour ${participation.participant?.email || participation.participantId}`);
        } catch (err) {
          this.logger.error(`❌ Erreur lors du remboursement pour ${participation.participant?.email || participation.participantId}: ${err.message}`);
        }
      }
    }

    // 4. Mettre à jour les paiements liés à l'événement (sécurité)
    await this.paymentService.refundAllPaymentsForEvent(event.id);

    this.logger.log(`Événement ${id} annulé (soft delete), notifications et remboursements Stripe traités`);
    return { success: true, message: 'Événement annulé, notifications et remboursements Stripe effectués' };
  }
} 