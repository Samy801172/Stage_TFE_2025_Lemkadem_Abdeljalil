import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { Event } from '@core/models/event.model';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EventStatus } from '@core/models/event.model';
import { NotificationService } from '@core/services/notification.service';

/**
 * Composant d'administration des événements
 * Permet de gérer la liste des événements, leur annulation et leur modification
 */
@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="events-management">
      <!-- En-tête avec titre et bouton d'ajout -->
      <header class="header">
        <h1>Gestion des événements</h1>
        <button class="add-btn" routerLink="create">
          <i class="fas fa-plus"></i> Nouvel événement
        </button>
      </header>

      <div class="events-list">
        <!-- Indicateur de chargement -->
        <div *ngIf="loading" class="loading-indicator">
          <i class="fas fa-spinner fa-spin"></i> Chargement des événements...
        </div>

        <!-- Message d'erreur avec bouton de réessai -->
        <div *ngIf="error" class="error-message">
          {{ error }}
          <button (click)="loadEvents()" class="retry-btn">
            <i class="fas fa-sync"></i> Réessayer
          </button>
        </div>

        <!-- Liste des événements -->
        <div *ngIf="!loading && !error">
          <!-- Carte d'événement -->
          <div *ngFor="let event of events" class="event-card" [class.cancelled]="event.is_cancelled">
            <!-- Informations de l'événement -->
            <div class="event-info">
              <h3>
                {{ event.title }}
                <span *ngIf="event.is_cancelled" class="badge-cancelled">Annulé</span>
              </h3>
              <p class="description">{{ event.description }}</p>
              <div class="event-meta">
                <!-- Date de l'événement -->
                <span class="date">
                  <i class="fas fa-calendar"></i>
                  {{ event.date | date:'dd/MM/yyyy HH:mm' }}
                </span>
                <!-- Lieu de l'événement -->
                <span class="location">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ event.location }}
                </span>
                <!-- Nombre de participants -->
                <span class="participants">
                  <i class="fas fa-users"></i>
                  {{ event.participants_count || 0 }}/{{ event.max_participants }}
                </span>
              </div>
            </div>
            <!-- Actions sur l'événement -->
            <div class="event-actions">
              <button class="edit-btn" [routerLink]="['edit', event.id]">
                <i class="fas fa-edit"></i>
              </button>
              <button *ngIf="!event.is_cancelled" class="cancel-btn" (click)="cancelEvent(event)">
                Annuler
              </button>
            </div>
          </div>

          <!-- Message si aucun événement -->
          <div *ngIf="events.length === 0" class="no-data">
            Aucun événement trouvé
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Styles du conteneur principal */
    .events-management {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Styles de l'en-tête */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    /* Styles du bouton d'ajout */
    .add-btn {
      background: #2ecc71;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .add-btn:hover {
      background: #27ae60;
    }

    /* Styles de la carte d'événement */
    .event-card {
      background: white;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Styles des informations de l'événement */
    .event-info {
      flex: 1;
    }

    .event-info h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 18px;
    }

    .description {
      color: #666;
      margin: 8px 0;
      font-size: 14px;
    }

    /* Styles des métadonnées de l'événement */
    .event-meta {
      display: flex;
      gap: 20px;
      color: #666;
      font-size: 14px;
    }

    .event-meta span {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* Styles des boutons d'action */
    .event-actions {
      display: flex;
      gap: 10px;
    }

    .edit-btn, .delete-btn {
      border: none;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
    }

    .edit-btn {
      background: #3498db;
      color: white;
    }

    .delete-btn {
      background: #e74c3c;
      color: white;
    }

    /* Styles des indicateurs de chargement et d'erreur */
    .loading-indicator {
      text-align: center;
      padding: 20px;
      color: #666;
    }

    .error-message {
      text-align: center;
      padding: 20px;
      color: #e74c3c;
      background: #fee;
      border-radius: 4px;
      margin: 10px 0;
    }

    .retry-btn {
      background: none;
      border: 1px solid #e74c3c;
      color: #e74c3c;
      padding: 5px 10px;
      border-radius: 4px;
      margin-left: 10px;
      cursor: pointer;
    }

    /* Styles pour les événements annulés */
    .event-card.cancelled {
      opacity: 0.6;
      background: #ffeaea;
      border: 1px solid #d32f2f;
    }

    .badge-cancelled {
      background: #d32f2f;
      color: white;
      border-radius: 8px;
      padding: 2px 8px;
      font-size: 0.8em;
      margin-left: 10px;
    }

    /* Styles du bouton d'annulation */
    .cancel-btn {
      background: #d32f2f;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      margin-left: 8px;
      cursor: pointer;
    }

    /* Styles des badges de statut */
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 0.8em;
      margin-left: 5px;
    }
    .badge-success {
      background: #388e3c;
      color: white;
    }
    .badge-primary {
      background: #1976d2;
      color: white;
    }
    .badge-warning {
      background: #fbc02d;
      color: #333;
    }
  `]
})
export class AdminEventsComponent implements OnInit, OnDestroy {
  // Propriétés du composant
  events: Event[] = []; // Liste des événements
  loading = false; // État de chargement
  error = ''; // Message d'erreur
  private subscription = new Subscription(); // Gestion des souscriptions

  // Injection des services
  constructor(
    private eventService: EventService,
    private notificationService: NotificationService
  ) {}

  /**
   * Initialisation du composant
   * Charge la liste des événements au démarrage
   */
  ngOnInit() {
    this.loadEvents();
  }

  /**
   * Nettoyage des ressources lors de la destruction du composant
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Charge la liste des événements depuis le service
   */
  loadEvents() {
    this.loading = true;
    this.error = '';

    this.subscription.add(
      this.eventService.getAllEvents().subscribe({
        next: (events) => {
          this.events = events;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading events:', error);
          this.error = 'Erreur lors du chargement des événements';
          this.loading = false;
        }
      })
    );
  }

  /**
   * Annule un événement
   * Gère les notifications différemment selon la présence de participants
   * @param event L'événement à annuler
   */
  cancelEvent(event: Event) {
    // Vérification de l'ID de l'événement
    if (!event.id) {
      alert("Erreur : ID de l'événement manquant !");
      return;
    }

    // Gestion des événements avec participants
    if (event.participants_count && event.participants_count > 0) {
      const confirmMessage = `Cet événement compte ${event.participants_count} participant(s).\n\n` +
        `Voulez-vous vraiment annuler cet événement ?\n` +
        `Les participants seront notifiés et remboursés automatiquement.`;
      
      if (confirm(confirmMessage)) {
        this.eventService.cancelEvent(event.id).subscribe({
          next: (response: any) => {
            // Toast d'annulation
            this.notificationService.success('Événement annulé avec succès.', 12000);
            // Toast email envoyé
            this.notificationService.success('Un email a été envoyé à tous les participants.', 12000);
            console.log('Annulation :', response);
            this.loadEvents();
          },
          error: (error) => {
            this.notificationService.error(
              error.message || 'Erreur lors de l\'annulation de l\'événement',
              12000
            );
            console.error('Erreur annulation événement :', error);
          }
        });
      }
    } else {
      // Gestion des événements sans participants
      if (confirm('Voulez-vous vraiment annuler cet événement ?')) {
        this.eventService.cancelEvent(event.id).subscribe({
          next: (response: any) => {
            // Uniquement le toast d'annulation
            this.notificationService.success('Événement annulé avec succès.', 12000);
            console.log('Annulation :', response);
            this.loadEvents();
          },
          error: (error) => {
            this.notificationService.error(
              error.message || 'Erreur lors de l\'annulation de l\'événement',
              12000
            );
            console.error('Erreur annulation événement :', error);
          }
        });
      }
    }
  }
} 