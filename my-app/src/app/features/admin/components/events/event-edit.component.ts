import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { Event, EventType, EventStatus, CreateEventPayload } from '@core/models/event.model';
import { NotificationService } from '@core/services/notification.service';

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
            [min]="minDateTime"
            [max]="maxDateTime"
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
          <button type="submit" class="btn-save" [disabled]="eventForm.invalid || isSubmitting">
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
      color: #666;
    }

    .back-btn:hover {
      color: #333;
    }

    h1 {
      margin: 0;
      font-size: 24px;
      color: #2c3e50;
    }

    .loading-indicator {
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
      color: #666;
    }

    .event-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #2c3e50;
    }

    input, textarea, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #3498db;
    }

    .error {
      border-color: #dc3545;
    }

    textarea {
      min-height: 150px;
      resize: vertical;
    }

    .form-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .btn-cancel {
      background: #f8f9fa;
      color: #333;
      border: 1px solid #ddd;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-cancel:hover {
      background: #e9ecef;
    }

    .btn-save {
      background: #2c3e50;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-save:hover:not(:disabled) {
      background: #34495e;
    }

    .btn-save:disabled {
      opacity: 0.7;
      cursor: not-allowed;
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

  minDateTime = this.getMinDateTime();
  maxDateTime = this.getMaxDateTime();

  getMinDateTime(): string {
    const now = new Date();
    now.setHours(8, 0, 0, 0); // 08:00
    return now.toISOString().slice(0, 16);
  }

  getMaxDateTime(): string {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 2);
    future.setHours(18, 0, 0, 0); // 18:00
    return future.toISOString().slice(0, 16);
  }

  isBusinessHours(dateStr: string): boolean {
    const date = new Date(dateStr);
    const hour = date.getHours();
    return hour >= 8 && hour < 18;
  }

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
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
      next: (event: any) => {
        console.log('Event loaded:', event);
        if (event && event.data) {
          this.event = event.data;
          this.updateForm(event.data);
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
    // Vérifie que la date est bien définie et valide
    let formattedDate = '';
    if (event.date) {
      const date = new Date(event.date);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toISOString().slice(0, 16);
      }
    }

    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      date: formattedDate, // Champ vide si date invalide
      location: event.location,
      price: event.price,
      max_participants: event.max_participants,
      type_event: event.type_event,
      status: event.status || EventStatus.UPCOMING
    });
  }

  onSubmit() {
    const formValue = this.eventForm.value;
    if (!this.isBusinessHours(formValue.date)) {
      alert("L'heure de l'événement doit être comprise entre 08:00 et 18:00.");
      return;
    }
    if (this.eventForm.valid && this.eventId && !this.isSubmitting) {
      this.isSubmitting = true;
      const eventPayload: CreateEventPayload = {
        title: formValue.title.trim(),
        description: formValue.description.trim(),
        date: new Date(formValue.date).toISOString(),
        location: formValue.location.trim(),
        price: Number(formValue.price),
        max_participants: Number(formValue.max_participants),
        type_event: formValue.type_event
      };

      console.log('Updating event:', this.eventId, eventPayload);

      this.eventService.updateEvent(this.eventId, eventPayload).subscribe({
        next: (response: any) => {
          if (response && response.message && response.message.includes('aucune modification')) {
            this.notificationService.info('Aucune modification détectée, aucun email envoyé.', 12000);
            console.log('Aucune modification détectée, aucun email envoyé.');
            this.isSubmitting = false;
            return;
          }
          this.notificationService.success('Événement modifié avec succès.', 12000);
          this.notificationService.success('Email envoyé aux participants.', 12000);
          console.log('Événement modifié et email envoyé aux participants.');
          this.router.navigate(['/admin/events']);
        },
        error: (error) => {
          this.notificationService.error(error.message || 'Erreur lors de la modification de l\'événement', 12000);
          console.error('Erreur lors de la modification de l\'événement :', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      Object.keys(this.eventForm.controls).forEach(key => {
        const control = this.eventForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
} 