import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(): boolean {
    // Vérifie si l'utilisateur est connecté
    if (this.authService.isLoggedIn()) {
      const isAdmin = this.authService.isAdmin();
      const url = this.router.url;
      console.log('[AuthGuard] isAdmin:', isAdmin, '| url:', url);

      // Si l'utilisateur est admin et tente d'accéder à une page non admin, on le redirige
      if (isAdmin && !url.includes('/admin')) {
        console.log('[AuthGuard] Redirection admin vers /admin/dashboard');
        this.router.navigate(['/admin/dashboard']);
        return false;
      }

      // Si l'utilisateur n'est pas admin mais tente d'accéder à une page admin, on le redirige
      if (!isAdmin && url.includes('/admin')) {
        console.log('[AuthGuard] Redirection membre vers /dashboard');
        this.router.navigate(['/dashboard']);
        return false;
      }

      // Accès autorisé
      return true;
    }

    // Si non connecté, redirige vers la page de login
    console.log('[AuthGuard] Non connecté, redirection vers /auth/login');
    this.router.navigate(['/auth/login']);
    return false;
  }
} 