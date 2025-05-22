import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '@core/services/notification.service';
import { Observable, Subscription } from 'rxjs';
import { NotificationComponent } from './shared/ui/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NotificationComponent],
  template: `
    <!-- Affichage centralisé des notifications -->
    <app-notification></app-notification>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 30px;
      right: 30px;
      z-index: 99999;
      padding: 1.5rem 2.5rem;
      border-radius: 12px;
      color: #fff;
      font-weight: bold;
      font-size: 1.2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 300px;
      text-align: center;
      opacity: 0.98;
      transition: opacity 0.3s;
    }
    .toast.success { background: #27ae60; }
    .toast.error { background: #e74c3c; }
    .toast.info { background: #3498db; }
    .toast.warning { background: #f1c40f; color: #222; }
  `]
})
export class AppComponent implements OnInit {
  notification$: Observable<Notification | null>;
  private notifSub?: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notification$ = this.notificationService.notifications$;
    this.notifSub = this.notification$.subscribe(notif => {
      if (notif && notif.duration) {
        setTimeout(() => {
          this.notificationService.clear();
        }, notif.duration);
      }
    });
  }

  ngOnInit() {
    // Suppression du toast de test : aucun toast ne s'affiche automatiquement au chargement
  }
} 