import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '@core/services/payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '@env/environment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="payment-container">
      <div class="payment-content">
        <h1>Paiement en cours</h1>
        <div class="loading-spinner" *ngIf="isLoading">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Préparation du paiement...</p>
        </div>
        <div class="error-message" *ngIf="error">
          <i class="fas fa-exclamation-circle"></i>
          <p>{{ error }}</p>
          <button class="btn-primary" (click)="retryPayment()">Réessayer</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .payment-content {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 90%;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
    }

    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .loading-spinner i {
      font-size: 2rem;
      color: #3498db;
    }

    .error-message {
      color: #e74c3c;
      margin-top: 1rem;
    }

    .error-message i {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .btn-primary {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      margin-top: 1rem;
      transition: background-color 0.2s;
    }

    .btn-primary:hover {
      background-color: #2980b9;
    }
  `]
})
export class PaymentComponent implements OnInit {
  isLoading = true;
  error: string | null = null;
  private eventId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    if (this.eventId) {
      this.initiatePayment();
    } else {
      this.error = 'ID de l\'événement non trouvé';
      this.isLoading = false;
    }
  }

  private async initiatePayment() {
    try {
      const response = await this.paymentService.createPaymentSession(this.eventId!).toPromise();
      if (response?.data?.url) {
        const stripe = await loadStripe(environment.stripe.publishableKey);
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({
            sessionId: response.data.url
          });
          if (error) {
            this.error = error.message || 'Une erreur est survenue lors du paiement';
          }
        } else {
          this.error = 'Erreur lors du chargement de Stripe';
        }
      } else {
        this.error = 'Erreur lors de la création de la session de paiement';
      }
    } catch (err) {
      this.error = 'Une erreur est survenue lors du paiement';
      console.error('Payment error:', err);
    } finally {
      this.isLoading = false;
    }
  }

  retryPayment() {
    this.isLoading = true;
    this.error = null;
    this.initiatePayment();
  }
} 