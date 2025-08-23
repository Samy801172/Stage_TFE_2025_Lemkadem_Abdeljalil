import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { PaymentService } from '@core/services/payment.service';
import { Event } from '@core/models/event.model';
import { AuthService } from '@core/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="event-detail-container" *ngIf="event">
      <header class="event-header">
        <button class="back-btn" (click)="goBack()">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1>{{ event.title }}</h1>
      </header>

      <div class="event-content">
        <div class="event-image" *ngIf="event.image_url">
          <img [src]="event.image_url" [alt]="event.title">
        </div>

        <div class="event-info">
          <div class="info-item">
            <i class="fas fa-calendar"></i>
            <span>{{ event.date | date:'dd/MM/yyyy HH:mm' }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ event.location }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-users"></i>
            <span>{{ event.participations?.length || 0 }}/{{ event.max_participants }} participants</span>
          </div>
          <div class="info-item">
            <i class="fas fa-euro-sign"></i>
            <span>{{ event.price }}€</span>
          </div>
        </div>

        <div class="event-description">
          <h2>Description</h2>
          <p>{{ event.description }}</p>
        </div>

        <div class="event-actions">
          <button 
            class="register-btn" 
            (click)="proceedToPayment()"
            [disabled]="isEventFull"
            *ngIf="!isUserRegistered">
            {{ getRegisterButtonText() }}
          </button>

          <button 
            class="cancel-btn" 
            (click)="cancelRegistration()"
            *ngIf="isUserRegistered">
            Annuler mon inscription
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .event-detail-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }

    .event-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .back-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
    }

    .event-content {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1.5rem;
    }

    .event-image img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }

    .event-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .info-item i {
      color: #3498db;
    }

    .event-description {
      margin-bottom: 2rem;
    }

    .event-actions {
      display: flex;
      gap: 1rem;
    }

    .register-btn, .cancel-btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      flex: 1;
    }

    .register-btn {
      background: #3498db;
      color: white;
    }

    .register-btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .cancel-btn {
      background: #e74c3c;
      color: white;
    }

    @media (max-width: 600px) {
      .event-info {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  isProcessing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(eventId).subscribe(
        event => this.event = event,
        error => console.error('Error loading event:', error)
      );
    }
  }

  cancelRegistration() {
    if (!this.event?.id) {
      console.error('Event ID is undefined');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir annuler votre inscription ?')) {
      this.eventService.unregisterFromEvent(this.event.id).subscribe({
        next: () => {
          if (this.event && this.event.participations) {
            const currentUserId = this.authService.getCurrentUserId();
            this.event.participations = this.event.participations.filter(
              p => p.member_id !== currentUserId
            );
          }
        },
        error: (error) => console.error('Erreur lors de l\'annulation:', error)
      });
    }
  }

  get isEventFull(): boolean {
    if (!this.event?.participations || !this.event?.max_participants) {
      return false;
    }
    return this.event.participations.length >= this.event.max_participants;
  }

  get isUserRegistered(): boolean {
    if (!this.event?.participations) {
      return false;
    }
    const currentUserId = this.authService.getCurrentUserId();
    return this.event.participations.some(p => p.member_id === currentUserId);
  }

  getRegisterButtonText(): string {
    if (this.isProcessing) return 'Traitement en cours...';
    if (this.isEventFull) return 'Événement complet';
    return `S'inscrire (${this.event?.price}€)`;
  }

  async proceedToPayment() {
    if (this.event) {
      try {
        this.router.navigate(['/payment/event', this.event.id]);
      } catch (error) {
        console.error('Error initiating payment:', error);
      }
    }
  }

  goBack() {
    this.router.navigate(['/events']);
  }

  async unregisterFromEvent() {
    if (!this.event?.id) {
      console.error('Event ID is undefined');
      return;
    }

    try {
      await firstValueFrom(this.eventService.unregisterFromEvent(this.event.id));
      this.loadEventDetails();
    } catch (error) {
      console.error('Error unregistering from event:', error);
    }
  }

  loadEventDetails() {
    if (this.event?.id) {
      this.eventService.getEventById(this.event.id).subscribe(
        event => this.event = event,
        error => console.error('Error loading event:', error)
      );
    }
  }
}