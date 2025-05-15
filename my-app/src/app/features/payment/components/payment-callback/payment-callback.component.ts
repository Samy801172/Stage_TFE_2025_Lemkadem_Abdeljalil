import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '@core/services/payment.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="spinner" *ngIf="loading">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Vérification du paiement...</p>
      </div>
      
      <div class="error-message" *ngIf="error">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }

    .spinner {
      text-align: center;
    }

    .spinner i {
      font-size: 2rem;
      color: var(--primary-green);
      margin-bottom: 1rem;
    }

    .error-message {
      color: var(--danger);
      text-align: center;
    }
  `]
})
export class PaymentCallbackComponent implements OnInit {
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  async ngOnInit() {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    
    if (!sessionId) {
      this.error = 'Session de paiement invalide';
      this.loading = false;
      return;
    }

    try {
      const response = await firstValueFrom(this.paymentService.verifyPaymentStatus(sessionId));
      
      if (response.data.status === 'completed') {
        this.router.navigate(['/payment/success']);
      } else {
        this.router.navigate(['/payment/error']);
      }
    } catch (error) {
      console.error('Erreur de vérification:', error);
      this.error = 'Erreur lors de la vérification du paiement';
      this.loading = false;
    }
  }
} 