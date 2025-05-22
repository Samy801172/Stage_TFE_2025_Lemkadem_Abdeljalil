import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { EventType, EventStatus, CreateEventPayload } from '@core/models/event.model';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="create-event-container">
      <div class="form-header">
        <h2>Créer un nouvel événement</h2>
        <a routerLink="/admin/events" class="back-link">← Retour</a>
      </div>

      <div class="event-preview">
        <h3>Aperçu de l'événement</h3>
        <div class="event-card">
          <div class="event-date">
            <div class="date-box">
              <span class="day">{{ getFormattedDay() }}</span>
              <span class="month">{{ getFormattedMonth() }}</span>
              <span class="year">{{ getFormattedYear() }}</span>
            </div>
            <div class="time">{{ getFormattedTime() }}</div>
          </div>
          <div class="event-details">
            <h4>{{ eventForm.get('title')?.value }}</h4>
            <p class="description">{{ eventForm.get('description')?.value }}</p>
            <div class="event-info">
              <span class="location">📍 {{ eventForm.get('location')?.value }}</span>
              <span class="price">💶 {{ eventForm.get('price')?.value }}€</span>
              <span class="participants">👥 {{ eventForm.get('max_participants')?.value }} participants max</span>
            </div>
          </div>
        </div>
      </div>

      <form [formGroup]="eventForm" (ngSubmit)="onSubmit()" class="event-form">
        <div class="form-section">
          <h3>Informations générales</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="title">Titre de l'événement *</label>
              <input 
                id="title" 
                type="text" 
                formControlName="title"
                placeholder="Ex: Workshop Business Networking"
                [class.error]="isFieldInvalid('title')">
              <div class="error-message" *ngIf="isFieldInvalid('title')">
                Le titre est requis
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="description">Description détaillée *</label>
              <textarea 
                id="description" 
                formControlName="description"
                placeholder="Décrivez votre événement en détail..."
                [class.error]="isFieldInvalid('description')"
                rows="5"></textarea>
              <div class="error-message" *ngIf="isFieldInvalid('description')">
                La description est requise
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Date et lieu</h3>
          <div class="form-row two-columns">
            <div class="form-group">
              <label for="date">Date et heure *</label>
              <input 
                id="date" 
                type="datetime-local" 
                formControlName="date"
                [class.error]="isFieldInvalid('date')">
              <div class="error-message" *ngIf="isFieldInvalid('date')">
                La date est requise
              </div>
            </div>

            <div class="form-group">
              <label for="location">Lieu *</label>
              <input 
                id="location" 
                type="text" 
                formControlName="location"
                placeholder="Ex: Business Center Brussels"
                [class.error]="isFieldInvalid('location')">
              <div class="error-message" *ngIf="isFieldInvalid('location')">
                Le lieu est requis
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Capacité et tarification</h3>
          <div class="form-row two-columns">
            <div class="form-group">
              <label for="price">Prix (€) *</label>
              <input 
                id="price" 
                type="number" 
                formControlName="price"
                min="0"
                placeholder="0"
                [class.error]="isFieldInvalid('price')">
              <div class="error-message" *ngIf="isFieldInvalid('price')">
                Le prix doit être supérieur ou égal à 0
              </div>
            </div>

            <div class="form-group">
              <label for="max_participants">Nombre maximum de participants *</label>
              <input 
                id="max_participants" 
                type="number" 
                formControlName="max_participants"
                min="1"
                placeholder="10"
                [class.error]="isFieldInvalid('max_participants')">
              <div class="error-message" *ngIf="isFieldInvalid('max_participants')">
                Le nombre de participants doit être supérieur à 0
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Type d'événement</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="type_event">Type *</label>
              <select 
                id="type_event" 
                formControlName="type_event"
                [class.error]="isFieldInvalid('type_event')">
                <option value="">Sélectionnez un type</option>
                <option *ngFor="let type of eventTypes" [value]="type">{{ type }}</option>
              </select>
              <div class="error-message" *ngIf="isFieldInvalid('type_event')">
                Le type d'événement est requis
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-test" (click)="fillTestData()" title="Remplir avec des données de test">
            Données test
          </button>
          <div class="main-buttons">
            <button type="button" class="btn-cancel" (click)="onCancel()">Annuler</button>
            <button 
              type="submit" 
              class="btn-submit"
              [disabled]="!eventForm.valid || isSubmitting">
              Créer l'événement
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-event-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .form-header h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }

    .back-link {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: #333;
    }

    .event-preview {
      margin-bottom: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .event-preview h3 {
      margin: 0 0 1rem 0;
      color: #2c3e50;
    }

    .event-card {
      display: flex;
      gap: 1.5rem;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .event-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .date-box {
      background: #007bff;
      color: white;
      padding: 0.5rem;
      border-radius: 6px;
      text-align: center;
      min-width: 80px;
    }

    .day {
      font-size: 1.5rem;
      font-weight: bold;
      display: block;
    }

    .month, .year {
      font-size: 0.9rem;
      display: block;
    }

    .time {
      font-size: 0.9rem;
      color: #666;
    }

    .event-details {
      flex: 1;
    }

    .event-details h4 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    .event-details .description {
      color: #666;
      margin-bottom: 1rem;
    }

    .event-info {
      display: flex;
      gap: 1rem;
      color: #666;
      font-size: 0.9rem;
    }

    .form-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .form-section h3 {
      margin: 0 0 1rem 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    .event-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: flex;
      gap: 1.5rem;
    }

    .form-row.two-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .form-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 500;
      color: #2c3e50;
      font-size: 0.9rem;
    }

    input, textarea, select {
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s;
      background: white;
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    .error {
      border-color: #dc3545 !important;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
    }

    .main-buttons {
      display: flex;
      gap: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
    }

    .btn-secondary {
      background: #e9ecef;
      color: #495057;
    }

    .btn-secondary:hover {
      background: #dee2e6;
    }

    .btn-cancel {
      background: #6c757d;
      color: white;
    }

    .btn-cancel:hover {
      background: #5a6268;
    }

    .btn-submit {
      background: #007bff;
      color: white;
    }

    .btn-submit:hover {
      background: #0056b3;
    }

    button:disabled {
      background: #e9ecef;
      color: #adb5bd;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .create-event-container {
        margin: 1rem;
        padding: 1rem;
      }

      .form-row.two-columns {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
        gap: 1rem;
      }

      .main-buttons {
        width: 100%;
        flex-direction: column;
      }

      button {
        width: 100%;
      }

      .event-card {
        flex-direction: column;
      }
    }
  `]
})
export class EventCreateComponent implements OnInit {
  eventForm: FormGroup;
  eventTypes = Object.values(EventType);
  isSubmitting = false;
  existingEvents: any[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
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
    this.eventService.getAllEvents().subscribe(events => {
      this.existingEvents = events;
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.eventForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFormattedDay(): string {
    const date = this.eventForm.get('date')?.value;
    if (!date) return '--';
    return new Date(date).getDate().toString().padStart(2, '0');
  }

  getFormattedMonth(): string {
    const date = this.eventForm.get('date')?.value;
    if (!date) return '--';
    return new Date(date).toLocaleString('fr-FR', { month: 'short' });
  }

  getFormattedYear(): string {
    const date = this.eventForm.get('date')?.value;
    if (!date) return '--';
    return new Date(date).getFullYear().toString();
  }

  getFormattedTime(): string {
    const date = this.eventForm.get('date')?.value;
    if (!date) return '--:--';
    return new Date(date).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  isDuplicateEvent(): boolean {
    const formValue = this.eventForm.value;
    return this.existingEvents.some(event =>
      new Date(event.date).toISOString() === new Date(formValue.date).toISOString() &&
      event.location.trim().toLowerCase() === formValue.location.trim().toLowerCase()
    );
  }

  onSubmit() {
    if (this.isDuplicateEvent()) {
      this.notificationService.error('Un événement similaire existe déjà à cette date et ce lieu', 15000);
      console.log('Duplicate event detected: ', this.eventForm.value);
      return;
    }
    if (this.eventForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.eventForm.value;
      
      const eventPayload: CreateEventPayload = {
        title: formValue.title.trim(),
        description: formValue.description.trim(),
        date: new Date(formValue.date).toISOString(),
        location: formValue.location.trim(),
        price: Number(formValue.price),
        max_participants: Number(formValue.max_participants),
        type_event: formValue.type_event,
        status: formValue.status
      };

      console.log('Submitting event:', eventPayload);

      this.eventService.createEvent(eventPayload).subscribe({
        next: (createdEvent) => {
          this.notificationService.success('Événement créé avec succès');
          this.notificationService.success('Email envoyé aux membres');
          console.log('Event created successfully:', createdEvent);
          this.router.navigate(['/admin/events']);
        },
        error: (error) => {
          this.notificationService.error(error.message || 'Une erreur est survenue lors de la création de l\'événement');
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.eventForm.controls).forEach(key => {
        const control = this.eventForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel() {
    if (confirm('Êtes-vous sûr de vouloir annuler la création de l\'événement ?')) {
      this.router.navigate(['/admin/events']);
    }
  }

  fillTestData() {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    futureDate.setHours(10, 0, 0, 0);

    this.eventForm.patchValue({
      title: 'Workshop Business Networking TEST1212',
      description: 'Un workshop pour développer son réseau professionnel et découvrir de nouvelles opportunités de business.',
      date: futureDate.toISOString().slice(0, 16),
      location: 'Business Center Brussels',
      price: 45,
      max_participants: 20,
      type_event: EventType.WORKSHOP,
      status: EventStatus.UPCOMING
    });
  }
} 