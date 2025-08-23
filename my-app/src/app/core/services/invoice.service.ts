import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // URL de base de l'API
  private apiUrl = 'http://localhost:2024/api';

  // Déclare une propriété pour stocker la notification courante
  notification: { message: string, type: 'success' | 'error' } | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Réclame une facture : déclenche la génération et l'envoi par email côté backend.
   * Utilise le bon endpoint /documents/request-invoice (et non /account/invoice/request).
   */
  requestInvoice(): Observable<any> {
    return this.http.post(`${this.apiUrl}/documents/request-invoice`, {});
  }

  // Confirme un paiement
  confirmPayment(): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/payment/confirm`, {}).pipe(
      tap(response => console.log('Payment confirmed:', response))
    );
  }

  /**
   * Récupère la dernière facture (document) de l'utilisateur connecté.
   * On suppose que le backend expose un endpoint qui retourne le dernier document de type INVOICE pour l'utilisateur.
   */
  getLastInvoiceId(): Observable<{ id: string }> {
    // À adapter selon l'URL réelle de ton backend
    return this.http.get<{ id: string }>(`${this.apiUrl}/documents/last-invoice`);
  }

  /**
   * Télécharge une facture PDF à partir de son documentId
   */
  downloadInvoice(documentId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/documents/${documentId}/download`, {
      responseType: 'blob'
    });
  }

  /**
   * Télécharge directement la dernière facture PDF de l'utilisateur connecté (endpoint /documents/last-invoice)
   * Utile pour un bouton toujours visible côté frontend.
   */
  downloadInvoiceLast(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/documents/last-invoice`, {
      responseType: 'blob'
    });
  }

  /**
   * Affiche une notification avec un message et un type ('success' ou 'error')
   * La notification disparaît automatiquement après 3 secondes
   */
  showNotification(message: string, type: 'success' | 'error' = 'success') {
    this.notification = { message, type };
    setTimeout(() => this.notification = null, 3000); // Disparition auto après 3s
  }
} 