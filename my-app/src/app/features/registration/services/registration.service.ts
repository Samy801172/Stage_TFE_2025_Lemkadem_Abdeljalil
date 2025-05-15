import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Registration } from '@core/models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Create a new registration
  registerForEvent(eventId: string, userId: string): Observable<Registration> {
    const registration: Partial<Registration> = {
      eventId,
      userId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return this.http.post<Registration>(`${this.apiUrl}/registrations`, registration);
  }

  // Get all registrations for a user
  getUserRegistrations(userId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}/registrations/user/${userId}`);
  }

  // Get all registrations for an event
  getEventRegistrations(eventId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}/registrations/event/${eventId}`);
  }

  // Update registration status
  updateRegistrationStatus(registrationId: string, status: 'confirmed' | 'cancelled'): Observable<Registration> {
    return this.http.patch<Registration>(`${this.apiUrl}/registrations/${registrationId}`, { status });
  }

  // Cancel registration
  cancelRegistration(registrationId: string): Observable<Registration> {
    return this.http.patch<Registration>(`${this.apiUrl}/registrations/${registrationId}`, { status: 'cancelled' });
  }
} 