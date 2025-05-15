import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { Event } from '@core/models/event.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { EventStatus, EventType } from '@core/models/event.model';

@Component({
  selector: 'app-payment-test',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="test-container">
      <div class="test-card">
        <h2>Scénario de test de paiement</h2>
        
        <div class="step-section">
          <h3>1. Préparation du test</h3>
          <p>
            Créez un événement de test "Workshop Networking - Session Test" avec un prix de 25€.
            Stripe est configuré en mode test.
          </p>
          
          <button 
            (click)="createTestEvent()" 
            class="action-btn"
            [disabled]="isCreatingEvent"
            [class.loading]="isCreatingEvent">
            {{ isCreatingEvent ? 'Création en cours...' : 'Créer un événement de test' }}
          </button>
          
          <div *ngIf="testEvent" class="success-message">
            Événement créé avec succès: <strong>{{ testEvent.title }}</strong>
          </div>
        </div>
        
        <div class="step-section">
          <h3>2. Instructions pour le test</h3>
          <ul class="instructions-list">
            <li>
              <div class="instruction-title">Carte de test Stripe</div>
              <div class="instruction-content">
                <code>4242 4242 4242 4242</code> - Date future - CVC: 123
              </div>
            </li>
            <li>
              <div class="instruction-title">Parcours à tester</div>
              <div class="instruction-content">
                <ol>
                  <li>Connectez-vous à l'application</li>
                  <li>Depuis le dashboard, trouvez l'événement "Workshop Networking - Session Test"</li>
                  <li>Cliquez sur le bouton "Participer"</li>
                  <li>Complétez le paiement avec la carte de test</li>
                  <li>Vérifiez que vous êtes redirigé vers la page de confirmation</li>
                  <li>Vérifiez que l'événement apparaît dans "Mes événements"</li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="step-section">
          <h3>3. Cas alternatifs à tester</h3>
          <ul class="instructions-list">
            <li>
              <div class="instruction-title">Paiement échoué</div>
              <div class="instruction-content">
                Utilisez la carte <code>4000 0000 0000 0002</code> pour simuler un échec
              </div>
            </li>
          </ul>
        </div>
        
        <div class="actions">
          <button 
            class="primary-button" 
            routerLink="/dashboard" 
            [disabled]="!testEvent">
            Aller au dashboard pour tester
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .test-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 2rem;
    }
    
    h2 {
      color: #2c3e50;
      margin-top: 0;
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;
    }
    
    .step-section {
      margin-bottom: 2rem;
    }
    
    h3 {
      color: #3498db;
      margin-bottom: 1rem;
    }
    
    .action-btn {
      background: #98FF98; /* Vert clair comme sur le design */
      color: #2d3436;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      margin-top: 1rem;
      
      &:disabled {
        background: #95a5a6;
        cursor: not-allowed;
      }
      
      &.loading {
        background: #95a5a6;
      }
    }
    
    .success-message {
      margin-top: 1rem;
      padding: 1rem;
      background: #e8f8f5;
      border-left: 4px solid #2ecc71;
      border-radius: 4px;
    }
    
    .instructions-list {
      list-style: none;
      padding: 0;
      
      li {
        margin-bottom: 1rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 4px;
      }
    }
    
    .instruction-title {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    code {
      background: #2c3e50;
      color: white;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
    }
    
    .actions {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
    }
    
    .primary-button {
      background: #3498db;
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      
      &:disabled {
        background: #95a5a6;
        cursor: not-allowed;
      }
    }
  `]
})
export class PaymentTestComponent implements OnInit {
  testEvent: Event | null = null;
  isCreatingEvent = false;
  
  constructor(
    private eventService: EventService,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Initialisation du composant
    console.log('Composant de test de paiement initialisé');
  }
  
  /**
   * Crée un événement de test pour les tests de paiement
   * Utilise le service d'événements pour créer un atelier de networking
   * avec un prix de 25€ comme spécifié dans les exigences
   */
  async createTestEvent() {
    try {
      this.isCreatingEvent = true;
      // Créer un événement de test
      const testEvent = {
        title: 'Workshop Networking - Session Test',
        description: 'Session de test pour le système de paiement. Apprenez les meilleures pratiques du networking professionnel.',
        date: new Date().toISOString(),  // Convertir Date en string
        location: 'Business Center Brussels',
        price: 25,
        max_participants: 30,
        is_validated: true,
        is_cancelled: false,
        participants_count: 0,
        status: EventStatus.UPCOMING,
        type_event: EventType.WORKSHOP,
        participations: [],
        categories: []
      };

      const event = await firstValueFrom(this.eventService.createEvent(testEvent));
      this.testEvent = event;
      console.log('Événement de test créé avec succès:', this.testEvent);
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement de test:', error);
      alert('Erreur lors de la création de l\'événement de test');
    } finally {
      this.isCreatingEvent = false;
    }
  }
} 