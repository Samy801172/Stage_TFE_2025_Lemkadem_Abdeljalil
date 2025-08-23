import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap, catchError, of, timer, switchMap, throwError } from 'rxjs';
import { Event, EventStatus, EventType, CreateEventPayload } from '@core/models/event.model';
import { Member } from '../models/member.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '@core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly apiUrl = `${environment.apiUrl}/events`;
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('[EventService] Initialized with URL:', this.apiUrl);
  }

  /**
   * Récupère tous les événements et filtre par mois
   */
  getEventsByMonth(date: Date): Observable<Event[]> {
    console.log('Fetching all events and filtering by month');

    return this.http.get<ApiResponse<Event[]>>(this.apiUrl).pipe(
      map(response => {
        console.log('API Response:', response);
        if (!response || !response.data) {
          console.warn('No events data in response');
          return [];
        }
        
        // Filtrer les événements pour le mois en cours
        const targetMonth = date.getMonth();
        const targetYear = date.getFullYear();
        
        return response.data.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getMonth() === targetMonth && 
                 eventDate.getFullYear() === targetYear;
        });
      }),
      tap({
        next: (events) => {
          console.log('Events filtered by month:', events);
          this.eventsSubject.next(events);
        },
        error: (error) => console.error('Error loading events:', error)
      }),
      catchError(error => {
        console.error('Error fetching events:', error);
        return of([]);
      })
    );
  }

  /**
   * Récupère les événements pour une date spécifique
   */
  getEventsByDate(date: Date): Observable<Event[]> {
    const formattedDate = date.toISOString().split('T')[0];
    return this.http.get<Event[]>(`${this.apiUrl}/date/${formattedDate}`);
  }

  /**
   * Crée un nouvel événement
   */
  createEvent(eventData: CreateEventPayload): Observable<Event> {
    const formattedData = {
      ...eventData,
      participants_count: 0,
      status: EventStatus.UPCOMING
    };

    return this.http.post<Event>(this.apiUrl, formattedData).pipe(
      tap(newEvent => {
        const currentEvents = this.eventsSubject.value;
        this.eventsSubject.next([...currentEvents, newEvent]);
      }),
      catchError(error => {
        console.error('Error creating event:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Met à jour un événement existant
   */
  updateEvent(id: string, eventData: Partial<CreateEventPayload>): Observable<Event> {
    return this.http.patch<Event>(`${this.apiUrl}/${id}`, eventData).pipe(
      tap(updatedEvent => {
        const currentEvents = this.eventsSubject.value;
        const index = currentEvents.findIndex(e => e.id === id);
        if (index !== -1) {
          currentEvents[index] = updatedEvent;
          this.eventsSubject.next([...currentEvents]);
        }
      }),
      catchError(error => {
        console.error(`Error updating event ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Supprime un événement
   */
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log('Successfully deleted event:', id);
        const currentEvents = this.eventsSubject.value;
        this.eventsSubject.next(currentEvents.filter(event => event.id !== id));
      }),
      catchError(error => {
        console.error(`Error deleting event ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Récupère les événements à venir
   */
  getUpcomingEvents(): Observable<Event[]> {
    console.log('[EventService] Fetching upcoming events');
    return this.http.get<any>(`${this.apiUrl}/upcoming`).pipe(
      map(response => {
        const events = Array.isArray(response) ? response : response?.data || [];
        console.log('[EventService] Received upcoming events:', events);
        return events;
      }),
      tap(events => this.eventsSubject.next(events)),
      catchError(error => {
        console.error('[EventService] Error fetching upcoming events:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Récupère les événements de l'utilisateur connecté
   */
  getUserEvents(): Observable<Event[]> {
    return this.getRegisteredEvents();
  }

  /**
   * Récupère les événements auxquels le membre est inscrit
   */
  getRegisteredEvents(): Observable<Event[]> {
    console.log('[EventService] Fetching registered events');
    return this.http.get<any>(`${this.apiUrl}/registered`).pipe(
      map(response => {
        const events = Array.isArray(response) ? response : response?.data || [];
        console.log('[EventService] Received registered events:', events);
        return events;
      }),
      catchError(error => {
        console.error('[EventService] Error fetching registered events:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * S'inscrire à un événement
   */
  registerForEvent(eventId: string): Observable<Event> {
    console.log(`[EventService] Registering for event: ${eventId}`);
    return this.http.post<Event>(`${this.apiUrl}/${eventId}/register`, {}).pipe(
      tap(updatedEvent => {
        console.log('[EventService] Registration successful:', updatedEvent);
        const currentEvents = this.eventsSubject.value;
        const index = currentEvents.findIndex(e => e.id === eventId);
        if (index !== -1) {
          currentEvents[index] = updatedEvent;
          this.eventsSubject.next([...currentEvents]);
        }
      }),
      catchError(error => {
        console.error('[EventService] Error registering for event:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Se désinscrire d'un événement
   */
  unregisterFromEvent(eventId: string): Observable<void> {
    console.log(`[EventService] Unregistering from event: ${eventId}`);
    return this.http.delete<void>(`${this.apiUrl}/${eventId}/register`).pipe(
      tap(() => {
        console.log('[EventService] Unregistration successful');
        const currentEvents = this.eventsSubject.value;
        const updatedEvents = currentEvents.map(event => 
          event.id === eventId 
            ? { ...event, participants_count: Math.max(0, event.participants_count - 1) }
            : event
        );
        this.eventsSubject.next(updatedEvents);
      }),
      catchError(error => {
        console.error('[EventService] Error unregistering from event:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Vérifie si l'utilisateur est inscrit à un événement
   */
  isRegisteredForEvent(eventId: string): Observable<boolean> {
    return this.http.get<ApiResponse<boolean>>(`${this.apiUrl}/${eventId}/is-registered`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error checking registration:', error);
        return of(false);
      })
    );
  }

  /**
   * Récupère les détails de paiement d'un événement
   */
  getEventPaymentDetails(eventId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${eventId}/payment-details`);
  }

  /**
   * Récupère un événement par son ID
   */
  getEventById(id: string): Observable<Event> {
    console.log(`[EventService] Fetching event details for ID: ${id}`);
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      tap(event => console.log('[EventService] Event details received:', event)),
      catchError(error => {
        console.error('[EventService] Error fetching event details:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Réinitialise la liste des événements
   */
  resetEvents(): void {
    this.eventsSubject.next([]);
  }

  /**
   * Force le rechargement des événements
   */
  refreshEvents(): void {
    console.log('Refreshing events...');
    const currentDate = new Date();
    this.getEventsByMonth(currentDate).subscribe({
      next: (events) => {
        console.log('Events refreshed successfully:', events);
        this.eventsSubject.next(events);
      },
      error: (error) => {
        console.error('Error refreshing events:', error);
      }
    });
  }

  getAllEvents(): Observable<Event[]> {
    console.log('[EventService] Fetching all events');
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Vérifier si la réponse est un tableau ou contient les données dans un champ data
        const events = Array.isArray(response) ? response : response?.data || [];
        console.log('[EventService] Received events:', events);
        return events;
      }),
      tap(events => this.eventsSubject.next(events)),
      catchError(error => {
        console.error('[EventService] Error fetching events:', error);
        return throwError(() => error);
      })
    );
  }

  cancelRegistration(eventId: string): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/${eventId}/cancel`, {}).pipe(
      tap(updatedEvent => {
        const currentEvents = this.eventsSubject.value;
        const index = currentEvents.findIndex(e => e.id === eventId);
        if (index !== -1) {
          currentEvents[index] = updatedEvent;
          this.eventsSubject.next([...currentEvents]);
        }
      }),
      catchError(error => {
        console.error(`Error canceling registration for event ${eventId}:`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Met à jour le statut d'un événement
   * Si le statut est CANCELLED, envoie { is_cancelled: true } sur /events/:id
   * Sinon, envoie { status } sur /events/:id
   */
  updateEventStatus(eventId: string, status: EventStatus): Observable<Event> {
    if (status === 'CANCELLED') {
      // Annulation : soft delete
      return this.http.patch<Event>(`${this.apiUrl}/${eventId}`, { is_cancelled: true }).pipe(
        tap(updatedEvent => {
          const currentEvents = this.eventsSubject.value;
          const index = currentEvents.findIndex(e => e.id === eventId);
          if (index !== -1) {
            currentEvents[index] = updatedEvent;
            this.eventsSubject.next([...currentEvents]);
          }
        }),
        catchError(error => {
          console.error(`Error cancelling event ${eventId}:`, error);
          return throwError(() => error);
        })
      );
    } else {
      // Changement de statut classique
      console.log('Changement de statut pour event.id =', eventId, 'status =', status);
      return this.http.patch<Event>(`${this.apiUrl}/${eventId}`, { status }).pipe(
        tap(updatedEvent => {
          const currentEvents = this.eventsSubject.value;
          const index = currentEvents.findIndex(e => e.id === eventId);
          if (index !== -1) {
            currentEvents[index] = updatedEvent;
            this.eventsSubject.next([...currentEvents]);
          }
        }),
        catchError(error => {
          console.error(`Error updating status for event ${eventId}:`, error);
          return throwError(() => error);
        })
      );
    }
  }

  /**
   * Annule un événement (soft delete + remboursement Stripe)
   * Appelle l'endpoint /events/:id/cancel
   */
  cancelEvent(eventId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${eventId}/cancel`, {});
  }
}