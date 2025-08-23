import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { EventService } from '@core/services/event.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <!-- Section profil utilisateur -->
      <div class="profile-section">
        <div class="profile-card">
          <div class="profile-header">
            <img [src]="userProfile.imageUrl || 'assets/default-avatar.png'" alt="Profile" class="profile-avatar">
            <h2>{{ userProfile.name }}</h2>
            <p>{{ userProfile.role }}</p>
          </div>
          
          <!-- Informations de profil -->
          <div class="profile-info">
            <h3>Mes informations</h3>
            <div class="info-grid">
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <span>{{ userProfile.email }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <span>{{ userProfile.phone }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ userProfile.location }}</span>
              </div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="profile-actions">
            <button class="action-btn primary">
              <i class="fas fa-edit"></i>
              Modifier mon profil
            </button>
            <button class="action-btn secondary">
              <i class="fas fa-cog"></i>
              Paramètres
            </button>
          </div>
        </div>
      </div>

      <!-- Section événements disponibles -->
      <div class="events-section">
        <h3>Événements disponibles</h3>
        <div class="events-grid">
          <div *ngFor="let event of availableEvents" class="event-card">
            <div class="event-header">
              <div class="event-date">
                <span class="day">{{ event.date | date:'dd' }}</span>
                <span class="month">{{ event.date | date:'MMM' | uppercase }}</span>
              </div>
              <div class="event-title">
                <h4>{{ event.title }}</h4>
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  {{ event.location }}
                </p>
              </div>
            </div>
            <div class="event-description">
              <p>{{ event.description }}</p>
            </div>
            <div class="event-footer">
              <div class="event-capacity">
                <i class="fas fa-users"></i>
                <span>{{ event.currentParticipants }}/{{ event.maxParticipants }}</span>
              </div>
              <button class="register-btn" [disabled]="event.isRegistered">
                {{ event.isRegistered ? 'Inscrit' : "S'inscrire à l'événement" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Mes réservations -->
      <div class="reservations-section">
        <h3>Mes réservations</h3>
        <div class="reservations-grid">
          <div *ngFor="let reservation of myReservations" class="reservation-card">
            <div class="reservation-header">
              <div class="reservation-date">
                <span class="day">{{ reservation.date | date:'dd' }}</span>
                <span class="month">{{ reservation.date | date:'MMM' | uppercase }}</span>
              </div>
              <div class="reservation-info">
                <h4>{{ reservation.title }}</h4>
                <p>{{ reservation.location }}</p>
              </div>
            </div>
            <div class="reservation-status" [class]="reservation.status.toLowerCase()">
              {{ reservation.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Variables globales */
    :host {
      --primary-color: #2196f3;
      --secondary-color: #4caf50;
      --danger-color: #f44336;
      --text-color: #333;
      --border-color: #e0e0e0;
      --background-color: #f5f5f5;
      --card-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .dashboard-container {
      padding: 2rem;
      background-color: var(--background-color);
      min-height: 100vh;
    }

    /* Section Profil */
    .profile-card {
      background: white;
      border-radius: 12px;
      box-shadow: var(--card-shadow);
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .profile-header {
      text-align: center;
      padding: 2rem;
      background: linear-gradient(135deg, var(--primary-color), #1976d2);
      color: white;
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid white;
      margin-bottom: 1rem;
      object-fit: cover;
    }

    .profile-header h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .profile-header p {
      margin: 0.5rem 0 0;
      opacity: 0.9;
    }

    .profile-info {
      padding: 2rem;
    }

    .info-grid {
      display: grid;
      gap: 1rem;
      margin-top: 1rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      background: var(--background-color);
      border-radius: 8px;
    }

    .info-item i {
      color: var(--primary-color);
    }

    .profile-actions {
      padding: 0 2rem 2rem;
      display: flex;
      gap: 1rem;
    }

    .action-btn {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 500;
      transition: all 0.2s;
    }

    .action-btn.primary {
      background: var(--primary-color);
      color: white;
    }

    .action-btn.secondary {
      background: var(--background-color);
      color: var(--text-color);
    }

    /* Section Événements */
    .events-section,
    .reservations-section {
      margin-bottom: 2rem;
    }

    h3 {
      margin: 0 0 1rem;
      color: var(--text-color);
      font-size: 1.2rem;
    }

    .events-grid,
    .reservations-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .event-card {
      background: white;
      border-radius: 12px;
      box-shadow: var(--card-shadow);
      overflow: hidden;
    }

    .event-header {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .event-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      background: var(--primary-color);
      color: white;
      border-radius: 8px;
      margin-right: 1rem;
      min-width: 60px;
    }

    .event-date .day {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .event-date .month {
      font-size: 0.8rem;
    }

    .event-title h4 {
      margin: 0 0 0.5rem;
      color: var(--text-color);
    }

    .event-title p {
      margin: 0;
      color: #666;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .event-description {
      padding: 1rem;
      color: #666;
    }

    .event-footer {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--background-color);
    }

    .event-capacity {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
    }

    .register-btn {
      padding: 0.5rem 1rem;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .register-btn:disabled {
      background: var(--secondary-color);
      cursor: not-allowed;
    }

    /* Section Réservations */
    .reservation-card {
      background: white;
      border-radius: 12px;
      box-shadow: var(--card-shadow);
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .reservation-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .reservation-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      background: var(--primary-color);
      color: white;
      border-radius: 8px;
      min-width: 60px;
    }

    .reservation-info h4 {
      margin: 0 0 0.5rem;
      color: var(--text-color);
    }

    .reservation-info p {
      margin: 0;
      color: #666;
    }

    .reservation-status {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-weight: 500;
    }

    .reservation-status.confirmed {
      background: var(--secondary-color);
      color: white;
    }

    .reservation-status.pending {
      background: #ff9800;
      color: white;
    }

    .reservation-status.cancelled {
      background: var(--danger-color);
      color: white;
    }
  `]
})
export class DashboardComponent implements OnInit {
  // Données du profil utilisateur
  userProfile = {
    imageUrl: 'assets/default-avatar.png',
    name: 'John Doe',
    role: 'Membre',
    email: 'john.doe@example.com',
    phone: '+32 123 456 789',
    location: 'Bruxelles, Belgique'
  };

  // Événements disponibles
  availableEvents = [
    {
      title: 'Networking TEST21',
      date: new Date('2024-07-11'),
      location: 'Centre Bruxellé',
      description: 'Apprendre les meilleures pratiques du web',
      currentParticipants: 0,
      maxParticipants: 20,
      isRegistered: false
    },
    {
      title: 'Networking TEST22',
      date: new Date('2024-07-12'),
      location: 'Centre Bruxellé',
      description: 'Apprendre les meilleures pratiques du web',
      currentParticipants: 0,
      maxParticipants: 20,
      isRegistered: true
    }
  ];

  // Mes réservations
  myReservations = [
    {
      title: 'Networking TEST21',
      date: new Date('2024-07-11'),
      location: 'Centre Bruxellé',
      status: 'Confirmé'
    },
    {
      title: 'Networking TEST22',
      date: new Date('2024-07-12'),
      location: 'Centre Bruxellé',
      status: 'En attente'
    }
  ];

  constructor(
    private authService: AuthService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
    this.loadAvailableEvents();
    this.loadMyReservations();
  }

  private loadUserProfile() {
    // TODO: Charger les données du profil depuis le service
  }

  private loadAvailableEvents() {
    // TODO: Charger les événements disponibles depuis le service
  }

  private loadMyReservations() {
    // TODO: Charger les réservations depuis le service
  }
} 