import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse } from '@core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  createPaymentSession(eventId: string): Observable<ApiResponse<{ url: string }>> {
    return this.http.post<ApiResponse<{ url: string }>>(`${this.apiUrl}/create-session`, { eventId });
  }

  createPaymentIntent(eventId: string): Observable<ApiResponse<{ clientSecret: string }>> {
    return this.http.post<ApiResponse<{ clientSecret: string }>>(`${this.apiUrl}/create-intent`, { eventId });
  }

  verifyPaymentStatus(sessionId: string): Observable<ApiResponse<{ status: string }>> {
    return this.http.get<ApiResponse<{ status: string }>>(`${this.apiUrl}/verify/${sessionId}`);
  }
} 