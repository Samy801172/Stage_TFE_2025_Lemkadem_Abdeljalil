import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  template: `
    <div class="success-container">
      <div class="success-card">
        <div class="success-icon">
          <fa-icon [icon]="faCheckCircle"></fa-icon>
        </div>
        <h2>Paiement réussi !</h2>
        <p>Votre inscription à l'événement a été confirmée.</p>
        <p class="secondary-text">Un email de confirmation vous a été envoyé.</p>
        <div class="actions">
          <button class="primary-button" routerLink="/dashboard">
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Conteneur principal centré */
    .success-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 2rem;
      background-color: #f8f9fa;
    }

    /* Carte de succès */
    .success-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 2rem;
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    /* Icône de succès en vert */
    .success-icon {
      font-size: 4rem;
      color: #98FF98; /* Vert clair comme dans le design */
      margin-bottom: 1rem;
    }

    /* Titre principal */
    h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.8rem;
    }

    /* Texte principal */
    p {
      color: #2d3436;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    /* Texte secondaire */
    .secondary-text {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }

    /* Conteneur des boutons d'action */
    .actions {
      display: flex;
      justify-content: center;
    }

    /* Bouton principal stylisé */
    .primary-button {
      background: #98FF98; /* Vert clair comme dans le design */
      color: #2d3436;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;

      &:hover {
        background: #78d978; /* Version plus foncée au survol */
        transform: translateY(-2px);
      }
    }
  `]
})
export class PaymentSuccessComponent implements OnInit {
  // Icône de FontAwesome pour le check de succès
  faCheckCircle = faCheckCircle;

  /**
   * Initialisation du composant de succès de paiement
   */
  ngOnInit() {
    // Log pour confirmer que l'utilisateur a atteint la page de succès de paiement
    console.log('Paiement confirmé avec succès, page de confirmation affichée');
  }
} 