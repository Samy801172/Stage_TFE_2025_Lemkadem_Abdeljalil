import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Utilisation de BehaviorSubject pour garder la dernière notification
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notifications$ = this.notificationSubject.asObservable();

  show(notification: Notification) {
    console.log('Notification envoyée:', notification); // Debug
    this.notificationSubject.next({
      duration: 5000,
      ...notification
    });
  }

  success(message: string, duration = 10000) {
    console.log('Notification envoyée :', { message, type: 'success', duration });
    this.show({ message, type: 'success', duration });
  }

  error(message: string, duration = 5000) {
    console.log('Error notification:', message); // Debug
    this.show({ message, type: 'error', duration });
  }

  info(message: string, duration = 5000) {
    console.log('Info notification:', message); // Debug
    this.show({ message, type: 'info', duration });
  }

  warning(message: string, duration = 5000) {
    console.log('Warning notification:', message); // Debug
    this.show({ message, type: 'warning', duration });
  }

  clear() {
    this.notificationSubject.next(null);
  }

} 