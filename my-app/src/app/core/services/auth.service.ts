import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { SignInPayload, SignupPayload, AuthResponse } from '@core/models/auth.model';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserRole } from '../models/user.model';
import { NotificationService } from '@core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/security';
  
  // Subject pour gérer l'état de l'utilisateur connecté (important pour PWA)
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {
    // Charger l'utilisateur depuis le localStorage au démarrage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  /**
   * Méthode de connexion unifiée (admin et membre)
   * Gère l'authentification et le stockage local pour le mode hors ligne
   */
  login(credentials: SignInPayload): Observable<AuthResponse> {
    console.log('Login attempt with credentials:', { ...credentials, password: '***' });
    
    // Determine the endpoint based on socialLogin flag
    const endpoint = credentials.socialLogin ? 'google/signin' : 'signin';
    
    // Try regular login first
    return this.http.post<AuthResponse>(`${this.apiUrl}/${endpoint}`, credentials).pipe(
      tap(response => {
        console.log('Auth Response:', response);
        
        if (response?.data) {
          // Store tokens
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          
          // Extract role from JWT payload
          const tokenPayload = this.parseJwt(response.data.token);
          const role = tokenPayload.role || UserRole.MEMBER;
          
          // Create user object
          const user: User = {
            id: tokenPayload.userId,
            username: tokenPayload.username,
            mail: tokenPayload.email,
            role: role,
            isAdmin: role === UserRole.ADMIN,
            credential_id: response.data.token_id,
            active: true,
            created: new Date(),
            updated: new Date()
          };
          
          console.log('Created user object:', user);
          
          // Update localStorage and BehaviorSubject
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          // Navigate based on role using Angular Router
          this.router.navigate([role === UserRole.ADMIN ? '/admin/dashboard' : '/dashboard'])
            .catch(error => {
              console.error('Navigation error:', error);
              // Fallback to window.location only if router navigation fails
              window.location.href = role === UserRole.ADMIN ? '/admin/dashboard' : '/dashboard';
            });
        }
      }),
      catchError(error => {
        console.log('CATCH ERROR DANS AUTHSERVICE', error);
        return throwError(() => error);
      })
    );
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return {};
    }
  }

  /**
   * Gère la navigation post-login avec vérification du résultat
   */
  private async redirectBasedOnRole() {
    try {
      const currentUser = this.currentUserSubject.value;
      if (!currentUser) {
        console.error('No current user found');
        window.location.replace('/auth/login');
        return;
      }

      console.log('Redirecting user with role:', currentUser.role);
      
      if (currentUser.role === UserRole.ADMIN) {
        console.log('Redirecting admin to dashboard');
        try {
          const success = await this.router.navigate(['/admin/dashboard']);
          if (!success) {
            console.log('Angular navigation failed, using location.replace');
            window.location.replace('/admin/dashboard');
          }
        } catch (error) {
          console.error('Navigation error:', error);
          window.location.replace('/admin/dashboard');
        }
      } else {
        console.log('Redirecting member to dashboard');
        window.location.replace('/dashboard');
      }
    } catch (error) {
      console.error('Redirect error:', error);
      window.location.replace('/dashboard');
    }
  }

  /**
   * Sauvegarde la session pour le mode hors ligne
   */
  private saveSession(response: AuthResponse): void {
    localStorage.clear();
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('lastLogin', new Date().toISOString());
  }

  /**
   * Restaure la session depuis le stockage local
   */
  private restoreSession(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Implémenter la validation du token et la restauration de la session
      this.getCurrentUser().subscribe(
        user => this.currentUserSubject.next(user)
      );
    }
  }

  /**
   * Vérifie si l'utilisateur est admin
   */
  isAdmin(): boolean {
    const user = this.getCurrentUserValue();
    console.log('isAdmin check - Current user:', user);
    return user?.role === UserRole.ADMIN;
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout() {
    // Supprime les tokens
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    // Réinitialise l'utilisateur courant
    this.currentUserSubject.next(null);
    // Redirige vers la page de connexion
    this.router.navigate(['/auth/login']);
  }

  /**
   * Vérifie si un utilisateur est connecté
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Inscription d'un nouvel utilisateur
   * @param data Informations d'inscription
   * @returns Observable avec la réponse de l'API
   */
  register(data: SignupPayload): Observable<AuthResponse> {
    // Adapter les données pour correspondre au format attendu par le backend
    // Le backend attend les champs : username, password, mail, nom, prenom, entreprise
    // Ici, on mappe lastName -> nom, firstName -> prenom, companyName -> entreprise
    const payload = {
      username: data.username,
      password: data.password,
      mail: data.mail,
      nom: data.lastName,           // lastName du formulaire devient nom pour l'API
      prenom: data.firstName,       // firstName du formulaire devient prenom pour l'API
      entreprise: data.companyName  // companyName du formulaire devient entreprise pour l'API
      // Ajoute d'autres champs si besoin
    };

    const endpoint = data.username.toLowerCase().includes('admin') ? 'admin-signup' : 'signup';

    return this.http.post<AuthResponse>(`${this.apiUrl}/${endpoint}`, payload).pipe(
      tap(response => {
        if (response?.data?.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          
          if (response.data.credential) {
            const user: User = {
              id: response.data.credential.id,
              username: response.data.credential.username,
              isAdmin: response.data.credential.isAdmin,
              credential_id: response.data.token_id,
              mail: response.data.credential.mail,
              active: true,
              created: new Date(),
              updated: new Date(),
              role: response.data.credential.isAdmin ? UserRole.ADMIN : UserRole.MEMBER
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
        }
      }),
      catchError(error => {
        console.error('Erreur d\'inscription:', error);
        return throwError(() => error.error?.message || 'Erreur lors de l\'inscription');
      })
    );
  }

  /**
   * Récupère les informations de l'utilisateur courant
   * @returns Observable avec les données utilisateur
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  /**
   * Vérifie si l'utilisateur a les rôles requis
   */
  hasRequiredRoles(requiredRoles: UserRole[]): boolean {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser || !currentUser.role) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const userRole = currentUser.role;
    if (!Object.values(UserRole).includes(userRole)) {
      console.warn(`Rôle invalide: ${userRole}`);
      this.router.navigate(['/dashboard']);
      return false;
    }

    const hasRole = requiredRoles.includes(userRole);
    if (!hasRole) {
      this.router.navigate(['/dashboard']);
      console.warn(`Accès refusé. Rôle requis: ${requiredRoles.join(' ou ')}, Rôle actuel: ${userRole}`);
    }
    return hasRole;
  }

  /**
   * Gère les erreurs d'autorisation
   */
  handleAuthError(error: any) {
    if (error.status === 403) {
      console.error('Accès non autorisé');
      this.router.navigate(['/dashboard']);
    }
  }

  getCurrentUserId(): string {
    const user = this.currentUserSubject.value;
    return user?.id || '';
  }

  // Nouvelle méthode pour accéder à l'utilisateur courant
  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(requiredRoles: UserRole[]): boolean {
    const currentUser = this.getCurrentUserValue();
    if (!currentUser) {
      return false;
    }
    const role = currentUser.role;
    if (!role || !Object.values(UserRole).includes(role)) {
      return false;
    }
    return requiredRoles.includes(role);
  }

  /**
   * Met à jour l'utilisateur courant dans le service
   * @param user L'utilisateur à définir comme courant
   */
  updateCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }
}