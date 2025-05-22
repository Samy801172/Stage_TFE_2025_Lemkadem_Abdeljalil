import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { Event, EventType, EventStatus, CreateEventPayload } from '@core/models/event.model';

/**
 * Composant d'édition d'événement
 * Permet de modifier les détails d'un événement existant
 */
@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="edit-event">
      <header class="header">
        <button class="back-btn" routerLink="/admin/events">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1>Modifier l'événement</h1>
      </header>

      <div *ngIf="loading" class="loading-indicator">
        <i class="fas fa-spinner fa-spin"></i> Chargement des données...
      </div>

      <form *ngIf="!loading" [formGroup]="eventForm" (ngSubmit)="onSubmit()" class="event-form">
        <div class="form-group">
          <label for="title">Titre *</label>
          <input 
            id="title" 
            type="text" 
            formControlName="title"
            [class.error]="eventForm.get('title')?.invalid && eventForm.get('title')?.touched">
        </div>

        <div class="form-group">
          <label for="description">Description *</label>
          <textarea 
            id="description" 
            formControlName="description"
            [class.error]="eventForm.get('description')?.invalid && eventForm.get('description')?.touched">
          </textarea>
        </div>

        <div class="form-group">
          <label for="date">Date *</label>
          <input 
            id="date" 
            type="datetime-local" 
            formControlName="date"
            [class.error]="eventForm.get('date')?.invalid && eventForm.get('date')?.touched">
        </div>

        <div class="form-group">
          <label for="location">Lieu *</label>
          <input 
            id="location" 
            type="text" 
            formControlName="location"
            [class.error]="eventForm.get('location')?.invalid && eventForm.get('location')?.touched">
        </div>

        <div class="form-group">
          <label for="max_participants">Nombre maximum de participants *</label>
          <input 
            id="max_participants" 
            type="number" 
            formControlName="max_participants"
            [class.error]="eventForm.get('max_participants')?.invalid && eventForm.get('max_participants')?.touched">
        </div>

        <div class="form-group">
          <label for="price">Prix (€) *</label>
          <input 
            id="price" 
            type="number" 
            formControlName="price"
            [class.error]="eventForm.get('price')?.invalid && eventForm.get('price')?.touched">
        </div>

        <div class="form-group">
          <label for="type_event">Type d'événement *</label>
          <select 
            id="type_event" 
            formControlName="type_event"
            [class.error]="eventForm.get('type_event')?.invalid && eventForm.get('type_event')?.touched">
            <option value="">Sélectionnez un type</option>
            <option *ngFor="let type of eventTypes" [value]="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="status">Statut *</label>
          <select 
            id="status" 
            formControlName="status"
            [class.error]="eventForm.get('status')?.invalid && eventForm.get('status')?.touched">
            <option value="UPCOMING">À venir</option>
            <option value="ONGOING">En cours</option>
            <option value="COMPLETED">Terminé</option>
            <option value="CANCELLED">Annulé</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" routerLink="/admin/events">
            Annuler
          </button>
          <button type="submit" class="btn-save" [disabled]="eventForm.invalid">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-event {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
    }

    .back-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      margin-right: 1rem;
    }

    .loading-indicator {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
      color: #666;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    input, textarea, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .error {
      border-color: #dc3545;
    }

    .form-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
    }

    .btn-cancel {
      background: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }

    .btn-save {
      background: #2c3e50;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }

    .btn-save:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    textarea {
      min-height: 150px;
      resize: vertical;
    }
  `]
})
export class EventEditComponent implements OnInit {
  eventForm: FormGroup;
  eventId: string = '';
  eventTypes = Object.values(EventType);
  loading = true;
  isSubmitting = false;
  event: Event | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required],
      location: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      max_participants: [0, [Validators.required, Validators.min(1)]],
      type_event: ['', Validators.required],
      status: [EventStatus.UPCOMING]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.eventId = params['id'];
        this.loadEvent();
      } else {
        console.error('No event ID provided');
        alert('Aucun événement spécifié');
        this.router.navigate(['/admin/events']);
      }
    });
  }

  private loadEvent() {
    this.loading = true;
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        console.log('Event loaded:', event);
        this.event = event;
        if (event) {
          this.updateForm(event);
        } else {
          console.error('Event not found');
          alert('Événement non trouvé');
          this.router.navigate(['/admin/events']);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading event:', error);
        this.loading = false;
        alert(error.message || 'Erreur lors du chargement de l\'événement');
        this.router.navigate(['/admin/events']);
      }
    });
  }

  private updateForm(event: Event) {
    // Vérifie que la date existe et est valide avant de la formater pour l'input
    let formattedDate = '';
    if (event.date) {
      const date = new Date(event.date);
      // Vérifie si la date est valide
      if (!isNaN(date.getTime())) {
        // Format ISO pour input datetime-local (YYYY-MM-DDTHH:mm)
        formattedDate = date.toISOString().slice(0, 16);
      } else {
        // Si la date est invalide, on laisse le champ vide
        console.warn('Date d\'événement invalide:', event.date);
      }
    }

    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      date: formattedDate, // Champ date sécurisé
      location: event.location,
      price: event.price,
      max_participants: event.max_participants,
      type_event: event.type_event,
      status: event.status || EventStatus.UPCOMING
    });
  }

  onSubmit() {
    if (this.eventForm.valid && this.eventId && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.eventForm.value;

      // Vérifie que la date du formulaire est bien définie et valide
      let isoDate = '';
      if (formValue.date) {
        const date = new Date(formValue.date);
        if (!isNaN(date.getTime())) {
          isoDate = date.toISOString();
        } else {
          alert('La date saisie est invalide.');
          this.isSubmitting = false;
          return;
        }
      } else {
        alert('Veuillez renseigner une date valide.');
        this.isSubmitting = false;
        return;
      }

      const eventPayload: CreateEventPayload = {
        title: formValue.title.trim(),
        description: formValue.description.trim(),
        date: isoDate, // Date sécurisée
        location: formValue.location.trim(),
        price: Number(formValue.price),
        max_participants: Number(formValue.max_participants),
        type_event: formValue.type_event,
        status: formValue.status
      };

      console.log('Updating event:', this.eventId, eventPayload);

      this.eventService.updateEvent(this.eventId, eventPayload).subscribe({
        next: (updatedEvent) => {
          console.log('Event updated successfully:', updatedEvent);
          this.router.navigate(['/admin/events']);
        },
        error: (error) => {
          console.error('Error updating event:', error);
          alert(error.message || 'Une erreur est survenue lors de la mise à jour de l\'événement');
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      // Marque tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.eventForm.controls).forEach(key => {
        const control = this.eventForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
} 