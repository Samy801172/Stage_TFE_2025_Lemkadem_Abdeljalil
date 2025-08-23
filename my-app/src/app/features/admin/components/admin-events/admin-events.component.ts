import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '@core/services/event.service';
import { Event, EventStatus } from '@core/models/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="events-container">
      <h1>Gestion des Événements</h1>
      
      <button class="action-btn" routerLink="/admin/events/create">
        <i class="fas fa-plus"></i> Nouvel événement
      </button>

      <div class="search-filter">
        <input 
          type="text" 
          [(ngModel)]="searchTerm" 
          (ngModelChange)="filterEvents()"
          placeholder="Rechercher un événement..."
          class="search-input"
        >
        <select [(ngModel)]="statusFilter" (ngModelChange)="filterEvents()" class="status-filter">
          <option value="">Tous les statuts</option>
          <option [value]="EventStatus.UPCOMING">À venir</option>
          <option [value]="EventStatus.ONGOING">En cours</option>
          <option [value]="EventStatus.COMPLETED">Terminé</option>
          <option [value]="EventStatus.CANCELLED">Annulé</option>
        </select>
      </div>

      <div class="events-table">
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Date</th>
              <th>Lieu</th>
              <th>Prix</th>
              <th>Participants</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let event of filteredEvents">
              <td>{{ event.title }}</td>
              <td>{{ formatDate(event.date) }}</td>
              <td>{{ event.location }}</td>
              <td>{{ event.price }}€</td>
              <td>{{ event.participants_count }}/{{ event.max_participants }}</td>
              <td>
                <select [ngModel]="event.status" (ngModelChange)="onStatusChange(event, $event)"
                  [disabled]="event.status === EventStatus.CANCELLED || event.status === EventStatus.COMPLETED"
                  class="status-select">
                  <option [value]="EventStatus.UPCOMING">À venir</option>
                  <option [value]="EventStatus.ONGOING">En cours</option>
                  <option [value]="EventStatus.COMPLETED">Terminé</option>
                  <option [value]="EventStatus.CANCELLED">Annulé</option>
                </select>
                <span [class]="'status-badge ' + (event.status || 'upcoming').toLowerCase()">
                  {{ getStatusLabel(event.status) }}
                </span>
              </td>
              <td class="actions">
                <button (click)="editEvent(event)" class="edit-btn">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr *ngIf="!loading && filteredEvents.length === 0">
              <td colspan="7" class="no-data">Aucun événement trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .events-container {
      padding: 20px;
    }

    h1 {
      margin-bottom: 20px;
    }

    .action-btn {
      background: #28a745;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
    }

    .action-btn:hover {
      background: #218838;
    }

    .search-filter {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .search-input, .status-filter {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .search-input {
      flex: 1;
    }

    .events-table {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .edit-btn, .delete-btn {
      border: none;
      padding: 6px;
      border-radius: 4px;
      cursor: pointer;
    }

    .edit-btn {
      background: #007bff;
      color: white;
    }

    .delete-btn {
      background: #dc3545;
      color: white;
    }

    .edit-btn:hover:not(:disabled),
    .delete-btn:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    .edit-btn:disabled,
    .delete-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      display: inline-block;
    }

    .status-badge.upcoming {
      background: #e3f2fd;
      color: #1976d2;
    }

    .status-badge.ongoing {
      background: #fff3e0;
      color: #f57c00;
    }

    .status-badge.completed {
      background: #e8f5e9;
      color: #388e3c;
    }

    .status-badge.cancelled {
      background: #ffebee;
      color: #d32f2f;
    }

    .no-data {
      text-align: center;
      color: #666;
      font-style: italic;
      padding: 20px;
    }
  `]
})
export class AdminEventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm = '';
  statusFilter = '';
  loading = false;
  error: string | null = null;
  EventStatus = EventStatus;
  private subscription = new Subscription();

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadEvents() {
    this.loading = true;
    this.error = null;

    this.subscription.add(
      this.eventService.getAllEvents().subscribe({
        next: (events) => {
          console.log('Events loaded:', events);
          this.events = events;
          this.filterEvents();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading events:', error);
          this.error = error.message || 'Erreur lors du chargement des événements';
          this.loading = false;
          this.events = [];
          this.filterEvents();
        }
      })
    );
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      const matchesSearch = !this.searchTerm || 
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (event.description?.toLowerCase() || '').includes(this.searchTerm.toLowerCase()) ||
        (event.location?.toLowerCase() || '').includes(this.searchTerm.toLowerCase());

      const matchesStatus = !this.statusFilter || event.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  formatDate(date: Date | string): string {
    if (!date) return '--';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '--';
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusLabel(status: EventStatus): string {
    switch (status) {
      case EventStatus.UPCOMING:
        return 'À venir';
      case EventStatus.ONGOING:
        return 'En cours';
      case EventStatus.COMPLETED:
        return 'Terminé';
      case EventStatus.CANCELLED:
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  }

  editEvent(event: Event) {
    if (event && event.id) {
      this.router.navigate(['/admin/events/edit', event.id]);
    }
  }

  cancelEvent(eventId: string) {
    if (confirm('Êtes-vous sûr de vouloir annuler cet événement ?')) {
      this.eventService.updateEventStatus(eventId, EventStatus.CANCELLED).subscribe({
        next: (updatedEvent) => {
          const idx = this.events.findIndex(e => e.id === eventId);
          if (idx !== -1) this.events[idx] = updatedEvent;
        },
        error: (error) => {
          console.error('Erreur lors de l\'annulation de l\'événement:', error);
          alert('Erreur lors de l\'annulation de l\'événement');
        }
      });
    }
  }

  /**
   * Change le statut d'un événement (PATCH via API)
   * @param event L'événement à modifier
   * @param newStatus Le nouveau statut sélectionné
   */
  onStatusChange(event: Event, newStatus: EventStatus) {
    if (event.status !== newStatus) {
      if (newStatus === EventStatus.CANCELLED) {
        // Confirmation supplémentaire pour l'annulation
        if (!confirm('Êtes-vous sûr de vouloir annuler cet événement ?')) {
          return;
        }
      }
      this.eventService.updateEventStatus(event.id, newStatus).subscribe({
        next: (updatedEvent) => {
          // Met à jour l'événement dans la liste locale
          const idx = this.events.findIndex(e => e.id === event.id);
          if (idx !== -1) this.events[idx] = updatedEvent;
          this.filterEvents();
        },
        error: (error) => {
          alert('Erreur lors du changement de statut');
        }
      });
    }
  }
} 