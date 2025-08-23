import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';

interface CalendarEvent {
  id: string;
  image: string;
  category: string;
  title: string;
  location: string;
  date: Date;
  isRegistered?: boolean;
  organizer: {
    name: string;
    avatar: string;
  };
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="agenda-wrapper">
      <!-- En-tête -->
      <h1>Gestion des Événements</h1>
      
      <!-- Bouton Nouvel événement -->
      <button class="new-event-btn">
        <i class="fas fa-plus"></i>
        Nouvel événement
      </button>

      <!-- Sélecteur de région -->
      <div class="region-selector">
        <i class="fas fa-map-marker-alt"></i>
        <span>Sélectionnez une région BT9</span>
        <i class="fas fa-chevron-down"></i>
      </div>

      <!-- Section Prochainement -->
      <h2>Prochainement</h2>
      
      <!-- Liste des événements -->
      <div class="events-list">
        <div *ngFor="let event of events" class="event-card">
          <div class="event-date-block">
            <span class="day">{{ event.date | date:'d' }}</span>
            <span class="month">{{ event.date | date:'MMM' | uppercase }}</span>
            <span class="year">{{ event.date | date:'yyyy' }}</span>
          </div>
          
          <div class="event-content">
            <div class="event-image">
              <img [src]="event.image" [alt]="event.title">
            </div>
            <div class="event-details">
              <div class="category">B° {{ event.category }}</div>
              <h3 class="title">{{ event.title }}</h3>
              <button class="register-btn" 
                      *ngIf="!event.isRegistered"
                      (click)="registerForEvent(event.id)">
                Inscrit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation du bas -->
      <nav class="bottom-nav">
        <a routerLink="/agenda" routerLinkActive="active" class="nav-item">
          <i class="fas fa-calendar"></i>
          <span>Agenda</span>
        </a>
        <a routerLink="/carpool" class="nav-item">
          <i class="fas fa-car"></i>
          <span>Carpool</span>
        </a>
        <a routerLink="/profile" class="nav-item">
          <i class="fas fa-user"></i>
          <span>Profil</span>
        </a>
        <a routerLink="/search" class="nav-item">
          <i class="fas fa-search"></i>
          <span>Recherche</span>
        </a>
        <a routerLink="/messages" class="nav-item">
          <i class="fas fa-comment"></i>
          <span>Messages</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .agenda-wrapper {
      padding: 2rem;
      background: #f8f9fa;
      min-height: 100vh;
    }

    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .new-event-btn {
      background: #28a745;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      cursor: pointer;
    }

    .region-selector {
      background: #ff6b35;
      color: white;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 4px;
      margin-bottom: 2rem;
      cursor: pointer;
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .event-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .event-date-block {
      background: white;
      padding: 1rem;
      text-align: center;
      min-width: 80px;
      border-right: 1px solid #eee;
    }

    .day {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }

    .month {
      display: block;
      font-size: 0.8rem;
      color: #666;
      text-transform: uppercase;
    }

    .year {
      display: block;
      font-size: 0.8rem;
      color: #666;
    }

    .event-content {
      flex: 1;
      display: flex;
      gap: 1rem;
      padding: 1rem;
    }

    .event-image {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      overflow: hidden;
    }

    .event-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .event-details {
      flex: 1;
    }

    .category {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .title {
      margin: 0 0 1rem;
      font-size: 1.1rem;
      color: #333;
    }

    .register-btn {
      background: #ff6b35;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    .bottom-nav {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      padding: 0.5rem;
      background: white;
      border-top: 1px solid #eee;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;
      text-decoration: none;
      color: #666;
      font-size: 0.8rem;
    }

    .nav-item.active {
      color: #ff6b35;
    }

    .nav-item i {
      font-size: 1.2rem;
    }
  `]
})
export class CalendarComponent implements OnInit {
  events: CalendarEvent[] = [
    {
      id: '1',
      image: 'assets/members/Clara.jpg',
      category: 'Wouters & Hendrix',
      title: 'Bedrijfsbezoek Wouters & Hendrix',
      location: 'Wouters & Hendrix',
      date: new Date('2024-02-04'),
      organizer: {
        name: 'Clara',
        avatar: 'assets/members/Clara.jpg'
      }
    },
    {
      id: '2',
      image: 'assets/members/Jon.jpg',
      category: 'Silversquare Bailli',
      title: 'Hall of Time - Chaque grande réussite commence par une idée audacieuse...',
      location: 'Silversquare Bailli',
      date: new Date('2024-02-04'),
      organizer: {
        name: 'Jon',
        avatar: 'assets/members/Jon.jpg'
      }
    },
    {
      id: '3',
      image: 'assets/members/Nat.jpg',
      category: 'Brabant Wallon (Axis Parc)',
      title: 'Business Speed Dating - Axis Parc',
      location: 'Axis Parc',
      date: new Date('2024-02-05'),
      organizer: {
        name: 'Nat',
        avatar: 'assets/members/Nat.jpg'
      }
    }
  ];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.eventService.getEventsByMonth(new Date()).subscribe({
      next: (events) => {
        console.log('Événements chargés:', events);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements:', error);
      }
    });
  }

  registerForEvent(eventId: string): void {
    this.eventService.registerForEvent(eventId).subscribe({
      next: () => {
        const event = this.events.find(e => e.id === eventId);
        if (event) {
          event.isRegistered = true;
        }
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription:', error);
      }
    });
  }
} 