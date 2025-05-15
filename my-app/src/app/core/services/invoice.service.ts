import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // URL de base de l'API
  private apiUrl = 'http://localhost:2024/api';

  constructor(private http: HttpClient) {}

  // Demande une nouvelle facture
  requestInvoice(): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/invoice/request`, {}).pipe(
      tap(response => console.log('Invoice requested:', response))
    );
  }

  // Confirme un paiement
  confirmPayment(): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/payment/confirm`, {}).pipe(
      tap(response => console.log('Payment confirmed:', response))
    );
  }

  // Télécharge une facture au format PDF
  downloadInvoice(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/account/invoice/download`, {
      responseType: 'blob'
    }).pipe(
      tap(() => console.log('Invoice download started'))
    );
  }
} 