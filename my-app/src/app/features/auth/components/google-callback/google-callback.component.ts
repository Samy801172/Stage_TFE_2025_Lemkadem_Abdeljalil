import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User, UserRole } from '@core/models/user.model';

@Component({
  selector: 'app-google-callback',
  template: `
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h2 class="text-xl font-semibold mb-4">Connexion en cours...</h2>
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  `,
  standalone: true
})
export class GoogleCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.handleCallback();
  }

  /**
   * Récupère le token dans l'URL, le stocke, puis redirige l'utilisateur selon son rôle
   */
  private handleCallback(): void {
    try {
      // Récupérer le token depuis l'URL
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        // Clear existing data
        localStorage.clear();
        
        // Store new token
        localStorage.setItem('token', token);
        
        // Decode token to get user info
        const tokenPayload = this.parseJwt(token);
        
        // Create user object
        const user: User = {
          id: tokenPayload.userId,
          username: tokenPayload.username,
          mail: tokenPayload.email,
          role: tokenPayload.role || UserRole.MEMBER,
          isAdmin: tokenPayload.role === UserRole.ADMIN,
          credential_id: tokenPayload.credential_id,
          active: true,
          created: new Date(),
          updated: new Date()
        };

        // Store user data
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Update auth service
        this.authService.updateCurrentUser(user);

        // Redirect based on role
        if (user.role === UserRole.ADMIN) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      } else {
        // If no token, redirect to login
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion Google:', error);
      this.router.navigate(['/login']);
    }
  }

  /**
   * Décode un JWT pour extraire son payload
   */
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return {};
    }
  }
} 