import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '@core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentWebhookService {
  private apiUrl = `${environment.apiUrl}/webhooks/stripe`;

  constructor(private http: HttpClient) {}

  /**
   * Traite le webhook de Stripe
   * Met à jour le statut de la participation en fonction du statut du paiement
   */
  handleStripeWebhook(payload: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, payload);
  }

  /**
   * Vérifie et met à jour le statut d'un paiement
   */
  checkPaymentStatus(paymentId: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/check-status/${paymentId}`);
  }
} 