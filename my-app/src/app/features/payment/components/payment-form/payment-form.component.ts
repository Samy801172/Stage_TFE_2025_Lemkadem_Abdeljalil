import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '@core/services/payment.service';
import { EventService } from '@core/services/event.service';
import { Event as AppEvent } from '@core/models/event.model';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { environment } from '@env/environment';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payment-container" *ngIf="event">
      <h2>Paiement pour {{ event.title }}</h2>
      
      <div class="payment-details">
        <p><strong>Date:</strong> {{ event.date | date:'dd/MM/yyyy HH:mm' }}</p>
        <p><strong>Lieu:</strong> {{ event.location }}</p>
        <p><strong>Montant:</strong> {{ event.price }}€</p>
      </div>

      <form id="payment-form" (ngSubmit)="handleSubmit($event)">
        <div id="payment-element"></div>
        
        <button 
          type="submit"
          class="pay-button" 
          [disabled]="isLoading"
          [class.loading]="isLoading">
          <span *ngIf="!isLoading">
            Payer {{ event.price }}€
          </span>
          <span *ngIf="isLoading">
            Traitement en cours...
          </span>
        </button>

        <div class="error-message" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .payment-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .payment-details {
      margin: 1.5rem 0;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
    }

    .card-element {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 0.5rem 0;
    }

    .pay-button {
      width: 100%;
      padding: 1rem;
      background: var(--primary-green);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .pay-button:disabled {
      background: #95a5a6;
      cursor: not-allowed;
    }

    .error-message {
      color: #e74c3c;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
  `]
})
export class PaymentFormComponent implements OnInit {
  event: AppEvent | null = null;
  isLoading = false;
  errorMessage = '';
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private eventService: EventService
  ) {}

  async ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (!eventId) {
      this.router.navigate(['/dashboard']);
      return;
    }

    try {
      this.event = await firstValueFrom(this.eventService.getEventById(eventId));
      await this.initializePayment(eventId);
    } catch (error) {
      console.error('Erreur chargement événement:', error);
      this.errorMessage = 'Impossible de charger les détails de l\'événement';
    }
  }

  private async initializePayment(eventId: string) {
    try {
      // Créer l'intention de paiement
      const response = await firstValueFrom(this.paymentService.createPaymentIntent(eventId));
      
      // Vérifier que nous avons bien reçu les données d'API avec le clientSecret
      if (!response?.data?.clientSecret) {
        throw new Error('Pas de clientSecret reçu');
      }
      
      // Initialiser Stripe avec la clé publique
      this.stripe = await loadStripe(environment.stripe.publishableKey);
      if (!this.stripe) throw new Error('Stripe not loaded');

      // Créer les éléments de formulaire avec le secret client
      this.elements = this.stripe.elements({
        clientSecret: response.data.clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2ecc71', // Couleur principale en vert
          }
        }
      });

      // Monter l'élément de paiement dans le DOM
      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');

    } catch (error) {
      console.error('Erreur initialisation paiement:', error);
      this.errorMessage = 'Impossible d\'initialiser le paiement';
    }
  }

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!this.stripe || !this.elements || !this.event) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        }
      });

      if (error) {
        this.errorMessage = error.message || 'Une erreur est survenue';
      }
    } catch (error) {
      console.error('Erreur paiement:', error);
      this.errorMessage = 'Une erreur est survenue lors du paiement';
    } finally {
      this.isLoading = false;
    }
  }
} 