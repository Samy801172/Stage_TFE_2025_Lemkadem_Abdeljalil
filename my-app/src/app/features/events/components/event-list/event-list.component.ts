import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { PaymentService } from '@core/services/payment.service';
import { Event, EventStatus } from '@core/models/event.model';
import { PaymentStatus } from '@core/models/payment.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Événements à venir</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (event of events; track event.id) {
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img [src]="event.image_url || 'assets/default-event.jpg'" 
                 [alt]="event.title"
                 class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2">{{ event.title }}</h3>
              <p class="text-gray-600 mb-2">{{ event.description }}</p>
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-500">
                  {{ event.date | date:'dd/MM/yyyy HH:mm' }}
                </span>
                <span class="text-blue-600 font-semibold">
                  {{ event.price | currency:'EUR' }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">
                  Places: {{ event.max_participants }}
                </span>
                <button 
                  [routerLink]="['/events', event.id]"
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Voir détails
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents() {
    this.eventService.getUpcomingEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements', error);
        // TODO: Ajouter un gestionnaire d'erreurs
      }
    });
  }
} 