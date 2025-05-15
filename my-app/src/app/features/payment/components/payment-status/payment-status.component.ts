import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentWebhookService } from '@core/services/payment-webhook.service';
import { interval, Subscription } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="payment-status-container">
      <div class="status-card">
        <h2>Statut du paiement</h2>
        
        <div class="status-content" [ngSwitch]="paymentStatus">
          <div *ngSwitchCase="'PENDING'" class="status pending">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Traitement du paiement en cours...</p>
          </div>
          
          <div *ngSwitchCase="'COMPLETED'" class="status success">
            <i class="fas fa-check-circle"></i>
            <p>Paiement effectué avec succès !</p>
            <button class="view-event-btn" (click)="goToMyEvents()">
              Voir mes événements
            </button>
          </div>
          
          <div *ngSwitchCase="'FAILED'" class="status error">
            <i class="fas fa-times-circle"></i>
            <p>Le paiement a échoué.</p>
            <button class="retry-btn" (click)="retryPayment()">
              Réessayer
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-status-container {
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .status-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 2rem;
      text-align: center;
    }

    .status-content {
      margin-top: 2rem;
    }

    .status {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .status i {
      font-size: 3rem;
    }

    .pending i {
      color: #f39c12;
    }

    .success i {
      color: #2ecc71;
    }

    .error i {
      color: #e74c3c;
    }

    button {
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .view-event-btn {
      background: var(--primary-color);
      color: white;
    }

    .retry-btn {
      background: var(--danger-color);
      color: white;
    }
  `]
})
export class PaymentStatusComponent implements OnInit, OnDestroy {
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' = 'PENDING';
  private statusCheckSubscription?: Subscription;
  private paymentId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentWebhookService: PaymentWebhookService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['payment_id'];
      if (this.paymentId) {
        this.startStatusCheck();
      }
    });
  }

  ngOnDestroy() {
    if (this.statusCheckSubscription) {
      this.statusCheckSubscription.unsubscribe();
    }
  }

  private startStatusCheck() {
    // Vérifie le statut toutes les 3 secondes jusqu'à ce qu'il soit COMPLETED ou FAILED
    this.statusCheckSubscription = interval(3000)
      .pipe(
        switchMap(() => this.paymentWebhookService.checkPaymentStatus(this.paymentId)),
        takeWhile(response => response.data.status === 'PENDING', true)
      )
      .subscribe({
        next: (response) => {
          this.paymentStatus = response.data.status;
          if (this.paymentStatus === 'COMPLETED') {
            setTimeout(() => this.goToMyEvents(), 2000);
          }
        },
        error: (error) => {
          console.error('Erreur lors de la vérification du statut:', error);
          this.paymentStatus = 'FAILED';
        }
      });
  }

  goToMyEvents() {
    this.router.navigate(['/my-events']);
  }

  retryPayment() {
    // Rediriger vers la page de l'événement
    this.router.navigate(['/events']);
  }
} 