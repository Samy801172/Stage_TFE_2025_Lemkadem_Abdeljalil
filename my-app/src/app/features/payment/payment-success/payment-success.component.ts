import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="success-container">
      <div class="success-content">
        <i class="fas fa-check-circle success-icon"></i>
        <h1>Paiement réussi !</h1>
        <p>Votre inscription a été confirmée avec succès.</p>
        <div class="actions">
          <button class="btn-primary" (click)="goToEvents()">Retour au dashboard</button>
          <!--
            Le bouton "Télécharger facture" n'est PAS géré ici.
            Il est affiché uniquement sur le dashboard, où la logique de récupération de la facture est centralisée.
            Si besoin, voir MemberDashboardComponent pour la gestion de la facture.
          -->
        </div>
      </div>
    </div>
  `,
  styles: [`
    .success-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .success-content {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: 400px;
      width: 90%;
    }

    .success-icon {
      font-size: 4rem;
      color: #28a745;
      margin-bottom: 1rem;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    p {
      color: #6c757d;
      margin-bottom: 2rem;
    }

    .actions {
      display: flex;
      justify-content: center;
    }

    .btn-primary {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .btn-primary:hover {
      background-color: #2980b9;
    }
  `]
})
export class PaymentSuccessComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToEvents() {
    this.router.navigate(['/dashboard']);
  }
} 