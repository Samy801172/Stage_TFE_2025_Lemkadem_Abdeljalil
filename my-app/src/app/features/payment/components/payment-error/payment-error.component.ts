import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment-error',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  template: `
    <div class="error-container">
      <div class="error-card">
        <div class="error-icon">
          <fa-icon [icon]="faTimesCircle"></fa-icon>
        </div>
        <h2>Erreur de paiement</h2>
        <p>Une erreur est survenue lors du traitement de votre paiement.</p>
        <div class="actions">
          <button class="retry-button" routerLink="/dashboard">
            Retourner au tableau de bord
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 2rem;
    }

    .error-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 2rem;
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    .error-icon {
      font-size: 4rem;
      color: var(--danger);
      margin-bottom: 1rem;
    }

    h2 {
      color: var(--primary-dark);
      margin-bottom: 1rem;
    }

    p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .retry-button {
      background: var(--primary-dark);
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s ease;

      &:hover {
        background: var(--primary-green);
      }
    }
  `]
})
export class PaymentErrorComponent {
  faTimesCircle = faTimesCircle;
} 