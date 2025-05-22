import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SignInPayload, AuthResponse } from '@core/models/auth.model';
import { finalize } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { GoogleLoginComponent } from '../../components/google-login/google-login.component';
import { NotificationService } from '@core/services/notification.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GoogleLoginComponent],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="logo-container">
          <img src="assets/TFE.jpg" alt="Network Hub Pro" class="logo">
        </div>

        <h1>Login</h1>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Nom d'utilisateur ou Email</label>
            <input 
              id="username" 
              type="text" 
              formControlName="username"
              class="form-control"
              placeholder="Entrez votre nom d'utilisateur ou email">
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password"
              class="form-control"
              placeholder="Entrez votre mot de passe">
          </div>

          <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || isLoading">
            {{ isLoading ? 'Connexion...' : 'Login' }}
          </button>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <div class="links">
            <a routerLink="/auth/register">Pas encore de compte ? Inscrivez-vous</a>
            <a routerLink="/auth/forgot-password">Mot de passe oublié ?</a>
          </div>
        </form>

        <!-- Bouton Google juste en dessous des liens -->
        <app-google-login></app-google-login>

        <!-- Copyright en bas de la carte -->
        <div class="copyright">&copy; {{ currentYear }} Kiwi Club</div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f7fa;
    }
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .logo-container {
      text-align: center;
      margin-bottom: 2rem;
    }
    .logo {
      max-width: 150px;
    }
    h1 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1rem;
      width: 100%;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #34495e;
    }
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      background: #eaf1fa;
    }
    .error-message {
      color: #e74c3c;
      margin: 1rem 0;
      text-align: center;
      font-weight: bold;
      font-size: 1.1em;
    }
    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-bottom: 1rem;
    }
    .btn-primary:hover {
      background: #2980b9;
    }
    .btn-primary:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
    .links {
      margin-top: 1rem;
      margin-bottom: 0.2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .links a {
      color: #3498db;
      text-decoration: none;
      font-size: 0.95rem;
    }
    .links a:hover {
      text-decoration: underline;
    }
    app-google-login {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 0.5rem;
      margin-top: 0;
    }
    .copyright {
      text-align: center;
      color: #aaa;
      font-size: 0.9rem;
      margin-top: 1rem;
      width: 100%;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Réinitialise le message d'erreur dès qu'on modifie un champ
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const credentials: SignInPayload = {
        username: this.loginForm.get('username')?.value || '',
        password: this.loginForm.get('password')?.value || '',
        socialLogin: false,
        googleHash: '',
        facebookHash: ''
      };

      this.authService.login(credentials).subscribe({
        next: (response: AuthResponse) => {
          this.isLoading = false;
          // Affiche le toast de bienvenue UNIQUEMENT si le token est présent (connexion réussie)
          if (response && response.data && response.data.token) {
            this.notificationService.success('Bienvenue !');
            localStorage.setItem('token', response.data.token);
            const tokenPayload = this.parseJwt(response.data.token);
            const role = tokenPayload.role;
            if (role === 'ADMIN') {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
        },
        error: (error: any) => {
          console.log('ERREUR LOGIN', error);
          this.isLoading = false;

          // Cas 1 : Compte désactivé
          if (
            error?.status === 401 &&
            (error?.error?.code === 'USER_INACTIVE' || error?.error?.message === 'User is not active')
          ) {
            this.errorMessage = "Votre compte est désactivé. Un administrateur vous a envoyé un email. Contactez-nous si besoin.";
            this.notificationService.error("Votre compte est désactivé. Un administrateur vous a envoyé un email. Contactez-nous si besoin.");
          }
          // Cas 2 : Mauvais identifiants (mot de passe erroné)
          else if (
            error?.status === 401 &&
            (
              error?.error?.code === 'api.payload.error.is-not-valid' ||
              error?.error?.message === 'Invalid Password Exception' ||
              error?.code === 'api.payload.error.is-not-valid' ||
              error?.message === 'Invalid Password Exception'
            )
          ) {
            console.log('Toast mauvais identifiants déclenché');
            this.errorMessage = "Identifiants invalides";
            this.notificationService.error("Email ou mot de passe incorrect.");
          }
          // Cas 3 : Autre erreur
          else {
            this.errorMessage = "Une erreur est survenue.";
            this.notificationService.error("Une erreur est survenue.");
          }
        }
      });
    }
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      return {};
    }
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
} 