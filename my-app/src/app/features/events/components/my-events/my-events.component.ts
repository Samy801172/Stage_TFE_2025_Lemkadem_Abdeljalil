import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { Event } from '@core/models/event.model';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="my-events-container">
      <h2>Mes événements</h2>

      <div class="events-grid">
        <div *ngFor="let event of myEvents" class="event-card">
          <div class="event-header">
            <div class="event-date">
              <span class="day">{{ event.date | date:'dd' }}</span>
              <span class="month">{{ event.date | date:'MMM' | uppercase }}</span>
            </div>
            <div class="event-title">
              <h3>{{ event.title }}</h3>
              <p class="event-type">{{ event.type_event }}</p>
            </div>
          </div>

          <div class="event-content">
            <p class="event-location">
              <i class="fas fa-map-marker-alt"></i>
              {{ event.location }}
            </p>
            <p class="event-description">{{ event.description }}</p>
            
            <div class="event-details">
              <div class="detail-item">
                <i class="fas fa-users"></i>
                <span>{{ event.participants_count }}/{{ event.max_participants }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-euro-sign"></i>
                <span>{{ event.price }}€</span>
              </div>
            </div>
          </div>

          <div class="event-footer">
            <div class="status-badge" [class]="getStatusClass(event)">
              {{ getStatusLabel(event.status) }}
            </div>

            <button 
              *ngIf="event.status === 'CONFIRMED'"
              class="calendar-btn" 
              (click)="addToCalendar(event)">
              <i class="fas fa-calendar-plus"></i>
              Ajouter à l'agenda
            </button>

            <button 
              *ngIf="canCancelEvent(event)"
              class="cancel-btn" 
              (click)="cancelParticipation(event)">
              <i class="fas fa-times"></i>
              Annuler ma participation
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="myEvents.length === 0" class="no-events">
        <p>Vous n'êtes inscrit à aucun événement pour le moment.</p>
        <a routerLink="/events" class="browse-events-btn">
          <i class="fas fa-search"></i>
          Parcourir les événements
        </a>
      </div>
    </div>
  `,
  styles: [`
    .my-events-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .event-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .event-header {
      display: flex;
      align-items: flex-start;
      padding: 1.5rem;
      background: var(--primary-color);
      color: white;
    }

    .event-date {
      background: white;
      color: var(--primary-color);
      padding: 0.5rem;
      border-radius: 8px;
      text-align: center;
      margin-right: 1rem;
      min-width: 60px;
    }

    .event-date .day {
      font-size: 1.5rem;
      font-weight: bold;
      display: block;
    }

    .event-date .month {
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    .event-title {
      flex: 1;
    }

    .event-title h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }

    .event-type {
      font-size: 0.9rem;
      opacity: 0.9;
      margin: 0;
    }

    .event-content {
      padding: 1.5rem;
      flex: 1;
    }

    .event-location {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      margin: 0 0 1rem 0;
    }

    .event-description {
      color: var(--text-color);
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }

    .event-details {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
    }

    .event-footer {
      padding: 1.5rem;
      background: var(--background-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .status-badge.pending {
      background: #ff9800;
      color: white;
    }

    .status-badge.confirmed {
      background: var(--secondary-color);
      color: white;
    }

    .status-badge.cancelled {
      background: #f44336;
      color: white;
    }

    .calendar-btn,
    .cancel-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .calendar-btn {
      background: #5c6bc0;
      color: white;
    }

    .cancel-btn {
      background: #f44336;
      color: white;
    }

    .no-events {
      text-align: center;
      margin-top: 4rem;
    }

    .browse-events-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: var(--primary-color);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 1rem;
    }

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `]
})
export class MyEventsComponent implements OnInit {
  myEvents: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadMyEvents();
  }

  private async loadMyEvents() {
    try {
      const events = await this.eventService.getUserEvents().toPromise();
      if (events) {
        this.myEvents = events;
      }
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
    }
  }

  getStatusClass(event: Event): string {
    return `status-badge ${event.status.toLowerCase()}`;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING': return 'En attente de paiement';
      case 'CONFIRMED': return 'Inscrit';
      case 'CANCELLED': return 'Annulé';
      default: return status;
    }
  }

  canCancelEvent(event: Event): boolean {
    return event.status !== 'CANCELLED' && 
           new Date(event.date) > new Date();
  }

  async cancelParticipation(event: Event) {
    if (!this.canCancelEvent(event)) return;

    try {
      await this.eventService.unregisterFromEvent(event.id).toPromise();
      await this.loadMyEvents(); // Recharger les événements pour avoir le statut à jour
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
    }
  }

  async addToCalendar(event: Event) {
    const start = new Date(event.date);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2 heures par défaut

    const icalData = {
      title: event.title,
      description: event.description,
      location: event.location,
      start: start.toISOString(),
      end: end.toISOString()
    };

    const icalContent = this.generateICalContent(icalData);
    const blob = new Blob([icalContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private generateICalContent(data: any): string {
    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${data.title}
DESCRIPTION:${data.description}
LOCATION:${data.location}
DTSTART:${data.start.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTEND:${data.end.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
END:VEVENT
END:VCALENDAR`;
  }
} 