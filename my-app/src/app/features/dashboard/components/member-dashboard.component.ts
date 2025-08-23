import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { ImageService } from '@core/services/image.service';
import { Subscription } from 'rxjs';
import { EventService } from '@core/services/event.service';
import { Event } from '@core/models/event.model';
import { PaymentService } from '@core/services/payment.service';
import { firstValueFrom } from 'rxjs';
import { BusinessCardComponent } from './business-card.component';
import { User } from '@core/models/user.model';
import { InvoiceService } from '@core/services/invoice.service';

@Component({
  selector: 'app-member-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BusinessCardComponent],
  template: `
    <!-- Container principal avec fond gris clair -->
    <div class="dashboard-wrapper">
      <!-- En-tête avec bouton de déconnexion -->
      <div class="dashboard-header">
        <h1>Tableau de bord</h1>
        <button class="logout-btn" (click)="onLogout()">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>

      <!-- Conteneur principal en deux colonnes -->
      <div class="dashboard-grid">
        <!-- Colonne gauche -->
        <div class="left-column">
          <!-- Carte de profil avec photo -->
          <div class="profile-card">
            <div class="profile-content">
              <div class="profile-image-container">
                <img [src]="currentUser?.profilePicture || 'assets/members/default.jpg'" 
                     [alt]="currentUser?.username" 
                     class="profile-image" 
                     loading="lazy" 
                     (error)="handleImageError($event)">
              </div>
              <h2>{{ currentUser?.firstName || currentUser?.username }}</h2>
              <span class="status-badge">MEMBRE ACTIF</span>
            </div>
          </div>

          <!-- Cartes d'actions -->
          <div class="action-cards">
            <!-- Carte de visioconférence -->
            <div class="action-card">
              <div class="card-content">
                <i class="fas fa-video"></i>
                <span>Rejoindre la visioconférence</span>
              </div>
              <i class="fas fa-eye"></i>
            </div>

            <!-- Carte des documents -->
            <div class="action-card">
              <div class="card-content">
                <i class="fas fa-file-alt"></i>
                <span>Documents disponibles</span>
              </div>
              <i class="fas fa-plus"></i>
            </div>
          </div>

          <!-- Statistiques -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ contactsCount || 0 }}</span>
                <span class="stat-label">CONTACTS</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-calendar"></i>
              </div>
              <div class="stat-info">
                <span class="stat-label">ÉVÉNEMENTS</span>
                <span class="stat-value">{{ registeredEvents.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonne droite -->
        <div class="right-column">
          <!-- Carte de visite -->
          <div class="business-card">
            <h3>Ma carte de visite</h3>
            <button class="view-card-btn" (click)="showBusinessCard()">
              <i class="fas fa-id-card"></i>
              Voir ma carte de visite
            </button>
          </div>

          <!-- Actions principales -->
          <div class="main-actions">
            <button class="action-btn">
              <i class="fas fa-check"></i>
              Confirmer ma présence
            </button>
            <!-- Le bouton est toujours visible, la vérification se fait côté backend -->
            <button class="action-btn" (click)="downloadLastInvoice()">
              <i class="fas fa-download"></i>
              Télécharger facture
            </button>
            <button class="action-btn" (click)="requestInvoice()">
              <i class="fas fa-file-invoice"></i>
              Réclamer une facture
            </button>
          </div>

          <!-- Statut de paiement -->
          <div class="payment-status">
            <div class="status-header">
              <i class="fas fa-check-circle"></i>
              <span>En règle de paiement</span>
            </div>
            <span class="next-payment">Prochain paiement ne peut dépasser</span>
          </div>

          <!-- Section événements disponibles -->
          <div class="events-section">
            <h3>Événements disponibles</h3>
            <div class="events-accordion">
              <div *ngFor="let event of upcomingEvents" class="event-item">
                <div class="event-header" (click)="event.isExpanded = !event.isExpanded">
                  <div class="event-title">
                    <h4>{{ event.title }}</h4>
                    <span class="price">{{ event.price }}€</span>
                  </div>
                  <i class="fas" [class.fa-chevron-down]="!event.isExpanded" [class.fa-chevron-up]="event.isExpanded"></i>
                </div>
                
                <div class="event-details" [class.expanded]="event.isExpanded">
                  <div class="event-info">
                    <p *ngIf="event.date"><i class="fas fa-calendar"></i> {{ event.date | date:'dd/MM/yyyy HH:mm' }}</p>
                    <p *ngIf="event.location"><i class="fas fa-map-marker-alt"></i> {{ event.location }}</p>
                    <p *ngIf="event.max_participants"><i class="fas fa-users"></i> {{ event.participants_count || 0 }}/{{ event.max_participants }} participants</p>
                    <p *ngIf="event.description" class="event-description"><i class="fas fa-info-circle"></i> {{ event.description }}</p>
                  </div>
                  
                  <div class="event-actions">
                    <button 
                      class="participate-button"
                      [class.loading]="event.isProcessing"
                      [disabled]="event.isProcessing || event.isFull"
                      (click)="participate(event)"
                    >
                      <ng-container *ngIf="!event.isProcessing">
                        <span *ngIf="event.price > 0">
                          Participer - {{ event.price }}€
                        </span>
                        <span *ngIf="event.price === 0">
                          Participer gratuitement
                        </span>
                      </ng-container>
                      <span *ngIf="event.isProcessing">
                        <i class="fas fa-spinner fa-spin"></i> Traitement...
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div *ngIf="upcomingEvents.length === 0" class="event-item no-data">
                Aucun événement disponible pour le moment.
              </div>
            </div>
          </div>

          <!-- Section mes événements -->
          <div class="registered-events">
            <h3>Mes événements</h3>
            <div class="events-accordion">
              <div *ngFor="let event of registeredEvents" class="event-item">
                <div class="event-header" (click)="event.isExpanded = !event.isExpanded">
                  <div class="event-title">
                    <h4>{{ event.title }}</h4>
                    <span class="status" [ngClass]="{
                      'paid': event.payment_status === 'PAID',
                      'refunded': event.payment_status === 'REFUNDED',
                      'cancelled': event.is_cancelled
                    }">
                      {{ getEventStatus(event) }}
                    </span>
                  </div>
                  <i class="fas" [class.fa-chevron-down]="!event.isExpanded" [class.fa-chevron-up]="event.isExpanded"></i>
                </div>
                
                <div class="event-details" [class.expanded]="event.isExpanded">
                  <div class="event-info">
                    <p *ngIf="event.date"><i class="fas fa-calendar"></i> {{ event.date | date:'dd/MM/yyyy HH:mm' }}</p>
                    <p *ngIf="event.location"><i class="fas fa-map-marker-alt"></i> {{ event.location }}</p>
                    <p *ngIf="event.description" class="event-description"><i class="fas fa-info-circle"></i> {{ event.description }}</p>
                  </div>
                  
                  <div class="event-actions">
                    <button 
                      class="action-btn calendar-btn" 
                      (click)="addToCalendar(event)"
                      *ngIf="event.date && isEventPaid(event)"
                      title="Télécharger au format .ics pour l'ajouter à votre calendrier (Google Calendar, Outlook, etc.)"
                    >
                      <i class="fas fa-calendar-plus"></i> Ajouter à mon agenda
                    </button>
                  </div>
                </div>
              </div>
              <div *ngIf="registeredEvents.length === 0" class="event-item no-data">
                Vous n'êtes inscrit à aucun événement pour le moment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Composant de la carte de visite -->
    <app-business-card
      [user]="currentUser"
      [isVisible]="isBusinessCardVisible"
    ></app-business-card>
  `,
  styles: [`
    /* Variables pour les couleurs */
    :host {
      --primary-green: #98FF98;
      --text-dark: #2d3436;
      --white: #ffffff;
      --background-light: #f5f6fa;
    }

    /* Styles du wrapper principal */
    .dashboard-wrapper {
      padding: 2rem;
      background: var(--background-light);
      min-height: 100vh;
    }

    /* En-tête du dashboard */
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 1.5rem;
      color: var(--text-dark);
    }

    /* Grid principal */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Styles de la carte de profil */
    .profile-card {
      background: var(--primary-green);
      border-radius: 15px;
      padding: 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .profile-image-container {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 auto 1rem;
      overflow: hidden;
      border: 3px solid var(--white);
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      background: var(--white);
    }

    .profile-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .profile-image:hover {
      transform: scale(1.05);
    }

    .status-badge {
      display: inline-block;
      background: var(--white);
      color: var(--text-dark);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }

    /* Styles des cartes d'action */
    .action-cards {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .action-card {
      background: var(--white);
      padding: 1rem;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Styles des statistiques */
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .stat-card {
      background: var(--white);
      padding: 1rem;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    /* Styles des boutons d'action */
    .action-btn {
      width: 100%;
      padding: 1rem;
      background: var(--primary-green);
      border: none;
      border-radius: 10px;
      color: var(--text-dark);
      font-size: 1rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .action-btn:hover {
      opacity: 0.9;
    }

    /* Styles de la carte de visite */
    .business-card {
      background: var(--white);
      padding: 2rem;
      border-radius: 15px;
      margin-bottom: 2rem;
    }

    .view-card-btn {
      width: 100%;
      padding: 1rem;
      background: var(--primary-green);
      border: none;
      border-radius: 10px;
      color: var(--text-dark);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      margin-top: 1rem;
    }

    /* Styles du statut de paiement */
    .payment-status {
      background: var(--primary-green);
      padding: 1rem;
      border-radius: 10px;
      color: var(--text-dark);
      margin-bottom: 2rem;
    }

    .status-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    /* Style du bouton de déconnexion */
    .logout-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: #333;
      cursor: pointer;
      padding: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: var(--primary-green);
      transform: translateX(3px);
    }

    .logout-btn i {
      transition: transform 0.3s ease;
    }

    .logout-btn:hover i {
      transform: translateX(2px);
    }

    /* Styles des événements */
    .events-accordion {
      margin-top: 1rem;
    }

    .event-item {
      background: var(--white);
      border-radius: 10px;
      margin-bottom: 1rem;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .event-header {
      padding: 1.5rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--white);
      transition: background-color 0.2s;
    }

    .event-header:hover {
      background: rgba(0,0,0,0.02);
    }

    .event-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      margin-right: 1rem;
    }

    .event-title h4 {
      margin: 0;
      font-size: 1.1rem;
      color: var(--text-dark);
    }

    .price {
      font-weight: bold;
      color: #2ecc71;
      font-size: 1.1rem;
    }

    .event-details {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      background: #f8f9fa;
    }

    .event-details.expanded {
      max-height: 500px;
      border-top: 1px solid rgba(0,0,0,0.1);
    }

    .event-info {
      padding: 1.5rem;
    }

    .event-info p {
      margin: 0.75rem 0;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: #666;
    }

    .event-info i {
      color: #3498db;
      width: 20px;
      text-align: center;
    }

    .event-actions {
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      background: white;
    }

    .participate-button {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #2ecc71;
      color: white;
    }

    .participate-button:hover:not(:disabled) {
      background: #27ae60;
      transform: translateY(-1px);
    }

    .participate-button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .calendar-btn {
      background: #3498db;
      color: white;
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .calendar-btn:hover {
      background: #2980b9;
      transform: translateY(-1px);
    }

    .payment-btn {
      background: #2ecc71;
      color: white;
    }

    .payment-btn:hover {
      background: #27ae60;
    }

    .status {
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.8rem;
      background: #f1c40f;
      color: white;
    }

    .status.paid {
      background: #2ecc71;
    }

    .status.refunded {
      background: #e74c3c;
      color: #fff;
    }

    .status.cancelled {
      background: #f39c12;
      color: #fff;
    }

    /* Styles des événements */
    .event-description {
      margin-top: 1rem;
      padding: 0.5rem;
      background: rgba(0,0,0,0.02);
      border-radius: 4px;
      white-space: pre-line;
    }

    .event-item:empty {
      display: none;
    }

    .event-item.no-data {
      padding: 2rem;
      text-align: center;
      color: #666;
      font-style: italic;
      background: #f8f9fa;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .event-actions {
        flex-direction: column;
      }

      .action-btn {
        margin-bottom: 0.5rem;
      }
    }
  `]
})
export class MemberDashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isBusinessCardVisible: boolean = false;
  private userSubscription?: Subscription;
  upcomingEvents: (Event & { isExpanded?: boolean; isProcessing?: boolean; isFull?: boolean })[] = [];
  registeredEvents: (Event & { isExpanded?: boolean })[] = [];
  loading = true;
  error = '';
  contactsCount: number = 0;
  lastInvoiceId: string | null = null;

  constructor(
    private authService: AuthService,
    private imageService: ImageService,
    private eventService: EventService,
    private router: Router,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = {
          ...user,
          profilePicture: this.imageService.getProfileImage(user.username, user.mail)
        };
      }
    });

    this.invoiceService.getLastInvoiceId().subscribe({
      next: (data) => {
        this.lastInvoiceId = data.id;
      },
      error: () => {
        this.lastInvoiceId = null;
      }
    });

    this.loadEvents();
    setInterval(() => this.loadEvents(), 30000);
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  handleImageError(event: any) {
    event.target.src = 'assets/members/default.jpg';
  }

  loadEvents() {
    this.loading = true;
    this.error = '';

    // Charger les événements disponibles
    this.eventService.getUpcomingEvents().subscribe({
      next: (events) => {
        this.upcomingEvents = events.map(event => ({
          ...event,
          isExpanded: false,
          isProcessing: false,
          isFull: this.isEventFull(event)
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des événements:', err);
        this.error = 'Erreur lors du chargement des événements';
        this.loading = false;
      }
    });

    // Charger les événements auxquels l'utilisateur est inscrit
    this.eventService.getRegisteredEvents().subscribe({
      next: (events) => {
        this.registeredEvents = events.map(event => ({
          ...event,
          isExpanded: false
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des inscriptions:', err);
        this.error = 'Erreur lors du chargement des inscriptions';
      }
    });
  }

  // Vérifier si l'événement est payé
  isEventPaid(event: any): boolean {
    return event.payment_status === 'PAID';
  }

  // Retourne le label à afficher selon le statut du paiement
  getPaymentLabel(paymentStatus: string): string {
    if (paymentStatus === 'REFUNDED') {
      return 'Remboursé';
    }
    if (paymentStatus === 'PAID') {
      return 'Payé';
    }
    return 'En attente de paiement';
  }

  // Modifie la fonction getEventStatus pour gérer le remboursement
  getEventStatus(event: any): string {
    // Cherche la participation de l'utilisateur courant dans la liste des participations de l'événement
    const myParticipation = event.participations?.find(
      (p: any) => p.member_id === this.currentUser?.id
    );
    // Utilise le statut de paiement de la participation si disponible, sinon utilise le statut global de l'événement
    const paymentStatus = myParticipation?.payment_status || event.payment_status;

    if (event.is_cancelled) return 'Annulé';
    if (paymentStatus === 'REFUNDED') return 'Remboursé';
    if (paymentStatus === 'PAID') return 'Payé';
    return 'En attente de paiement';
  }

  async participate(event: Event & { isProcessing?: boolean; isFull?: boolean }) {
    if (!event.isProcessing && !event.isFull && event.id) {
      try {
        event.isProcessing = true;

        if (event.price > 0) {
          const response = await firstValueFrom(
            this.paymentService.createPaymentSession(event.id)
          );
          this.loadEvents();
          if (response.data?.url) {
            window.location.href = response.data.url;
          }
        } else {
          await firstValueFrom(this.eventService.registerForEvent(event.id));
          this.loadEvents();
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        event.isProcessing = false;
      }
    }
  }

  proceedToPayment(eventId: string | undefined) {
    if (!eventId) {
      console.error('Event ID is undefined');
      return;
    }
    this.paymentService.createPaymentSession(eventId).subscribe({
      next: (response) => {
        if (response.data?.url) {
          window.location.href = response.data.url;
        } else {
          console.error('Payment URL is missing');
          alert('Erreur lors de la création de la session de paiement');
        }
      },
      error: (error) => {
        console.error('Error creating payment session:', error);
        alert('Erreur lors de la création de la session de paiement');
      }
    });
  }

  async registerForEvent(eventId: string | undefined) {
    if (!eventId) {
      console.error('Event ID is undefined');
      return;
    }
    try {
      await firstValueFrom(this.eventService.registerForEvent(eventId));
      this.loadEvents();
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Erreur lors de l\'inscription à l\'événement');
    }
  }

  addToCalendar(event: Event) {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    // Formatage des dates pour le format ICS
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    // Nettoyage du texte pour le format ICS
    const cleanText = (text: string) => {
      return text.replace(/[,;]/g, '').replace(/\n/g, '\\n');
    };

    // Création du contenu du fichier ICS avec plus de détails
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TFE2025//Networking Events//FR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${cleanText(event.title)}`,
      `DESCRIPTION:${cleanText(event.description || '')}`,
      `LOCATION:${cleanText(event.location || '')}`,
      'STATUS:CONFIRMED',
      `ORGANIZER;CN=TFE2025:mailto:contact@tfe2025.com`,
      `UID:${event.id}@tfe2025.com`,
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Création du blob et téléchargement
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_tfe2025.ics`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Afficher les instructions dans une alerte
    alert(`Le fichier ${fileName} a été téléchargé.\n\nPour l'ouvrir :\n1. Double-cliquez sur le fichier téléchargé\n2. Votre application de calendrier par défaut s'ouvrira automatiquement\n3. Confirmez l'ajout de l'événement à votre calendrier\n\nApplications compatibles :\n- Google Calendar\n- Microsoft Outlook\n- Apple Calendar\n- Et autres applications de calendrier standard`);
  }

  isEventFull(event: Event): boolean {
    return (event.participants_count || 0) >= (event.max_participants || 0);
  }

  getRegisterButtonText(): string {
    // Implementation of getRegisterButtonText method
    return 'Inscrire';
  }

  isUserRegistered(event: Event): boolean {
    // Implementation of isUserRegistered method
    return false;
  }

  showBusinessCard() {
    this.isBusinessCardVisible = true;
  }

  hideBusinessCard() {
    this.isBusinessCardVisible = false;
  }

  // Méthode pour télécharger la dernière facture PDF, même si l'id n'est pas connu à l'avance
  downloadLastInvoice() {
    this.invoiceService.downloadInvoiceLast().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'facture.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        alert('Aucune facture disponible pour le moment.');
      }
    });
  }

  // Méthode pour réclamer une facture
  requestInvoice() {
    this.invoiceService.requestInvoice().subscribe(response => {
      alert('Votre demande de facture a été prise en compte. Vous la recevrez par mail.');
    });
  }
}