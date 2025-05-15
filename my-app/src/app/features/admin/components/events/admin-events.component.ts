import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { Event } from '@core/models/event.model';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { EventStatus } from '@core/models/event.model';

/**
 * Composant d'édition d'événement
 * Permet de modifier les détails d'un événement existant
 */
@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="events-management">
      <header class="header">
        <h1>Gestion des événements</h1>
        <button class="add-btn" routerLink="create">
          <i class="fas fa-plus"></i> Nouvel événement
        </button>
      </header>

      <div class="events-list">
        <div *ngIf="loading" class="loading-indicator">
          <i class="fas fa-spinner fa-spin"></i> Chargement des événements...
        </div>

        <div *ngIf="error" class="error-message">
          {{ error }}
          <button (click)="loadEvents()" class="retry-btn">
            <i class="fas fa-sync"></i> Réessayer
          </button>
        </div>

        <div *ngIf="!loading && !error">
          <div *ngFor="let event of events" class="event-card" [class.cancelled]="event.is_cancelled">
            <div class="event-info">
              <h3>
                {{ event.title }}
                <span *ngIf="event.is_cancelled" class="badge-cancelled">Annulé</span>
              </h3>
              <p class="description">{{ event.description }}</p>
              <div class="event-meta">
                <span class="date">
                  <i class="fas fa-calendar"></i>
                  {{ event.date | date:'dd/MM/yyyy HH:mm' }}
                </span>
                <span class="location">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ event.location }}
                </span>
                <span class="participants">
                  <i class="fas fa-users"></i>
                  {{ event.participants_count || 0 }}/{{ event.max_participants }}
                </span>
              </div>
            </div>
            <div class="event-actions">
              <button class="edit-btn" [routerLink]="['edit', event.id]">
                <i class="fas fa-edit"></i>
              </button>
              <button *ngIf="!event.is_cancelled" class="cancel-btn" (click)="cancelEvent(event)">
                Annuler
              </button>
            </div>
          </div>

          <div *ngIf="events.length === 0" class="no-data">
            Aucun événement trouvé
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .events-management {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

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

    .no-data {
      text-align: center;
      padding: 20px;
      color: #666;
    }

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

    .cancel-btn {
      background: #d32f2f;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      margin-left: 8px;
      cursor: pointer;
    }

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
  events: Event[] = [];
  loading = false;
  error = '';
  private subscription = new Subscription();

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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
   * Change le statut d'un événement (PATCH via API)
   * @param event L'événement à modifier
   * @param status Le nouveau statut sélectionné (string du select)
   */
  onStatusChange(event: Event, status: string) {
    // Vérification de l'ID avant d'appeler le service
    if (!event.id) {
      alert('Erreur : ID de l\'événement manquant !');
      console.error('Tentative de changement de statut avec un event.id undefined', event);
      return;
    }
    console.log('Changement de statut pour event.id =', event.id, 'status =', status);
    this.eventService.updateEventStatus(event.id, status as any).subscribe({
      next: () => {
        event.status = status as any;
        alert('Statut mis à jour avec succès !'); // Confirmation visuelle
      },
      error: (error) => {
        console.error('Error updating event status:', error);
        alert('Erreur lors de la mise à jour du statut de l\'événement');
      }
    });
  }

  /**
   * Annule un événement (soft delete)
   * @param event L'événement à annuler
   */
  cancelEvent(event: Event) {
    if (!event.id) {
      alert("Erreur : ID de l'événement manquant !");
      return;
    }
    if (confirm('Voulez-vous vraiment annuler cet événement ?')) {
      this.eventService.cancelEvent(event.id).subscribe({
        next: () => {
          this.loadEvents(); // Recharge la liste depuis l'API pour un rendu à jour
          alert('Événement annulé avec succès !');
        },
        error: (error) => {
          alert('Erreur lors de l\'annulation de l\'événement');
          console.error(error);
        }
      });
    }
  }
} 