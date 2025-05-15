import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SignupPayload } from '@core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="logo-container">
          <img src="assets/TFE.jpg" alt="Network Hub Pro" class="logo">
        </div>

        <h1>Inscription</h1>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input 
              id="firstName" 
              type="text" 
              formControlName="firstName"
              class="form-control"
              placeholder="Votre prénom">
          </div>

          <div class="form-group">
            <label for="lastName">Nom</label>
            <input 
              id="lastName" 
              type="text" 
              formControlName="lastName"
              class="form-control"
              placeholder="Votre nom">
          </div>

          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input 
              id="username" 
              type="text" 
              formControlName="username"
              class="form-control"
              placeholder="Choisissez un nom d'utilisateur">
            <small class="form-text text-muted">
              Minimum 3 caractères, lettres et chiffres uniquement
            </small>
          </div>

          <div class="form-group">
            <label for="mail">Email</label>
            <input 
              id="mail" 
              type="email" 
              formControlName="mail"
              class="form-control"
              placeholder="Votre adresse email">
          </div>

          <div class="form-group">
            <label for="companyName">Nom de l'entreprise</label>
            <input 
              id="companyName" 
              type="text" 
              formControlName="companyName"
              class="form-control"
              placeholder="Nom de votre entreprise">
          </div>

          <div class="form-group">
            <label for="companySector">Secteur d'activité</label>
            <input 
              id="companySector" 
              type="text" 
              formControlName="companySector"
              class="form-control"
              placeholder="Secteur d'activité de votre entreprise">
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password"
              class="form-control"
              placeholder="Choisissez un mot de passe">
            <small class="form-text text-muted">
              Minimum 6 caractères, au moins une lettre et un chiffre
            </small>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <input 
              id="confirmPassword" 
              type="password" 
              formControlName="confirmPassword"
              class="form-control"
              placeholder="Confirmez votre mot de passe">
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button type="submit" [disabled]="registerForm.invalid || isLoading">
            {{ isLoading ? 'Inscription en cours...' : 'Créer un compte' }}
          </button>

          <div class="login-link">
            <a routerLink="/auth/login">Déjà inscrit ? Connectez-vous</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f5f7fa;
    }

    .register-card {
      width: 100%;
      max-width: 500px;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .logo-container {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo {
      width: 150px;
    }

    h1 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .error-message {
      color: #e74c3c;
      margin-bottom: 1rem;
      text-align: center;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }

    button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .login-link {
      margin-top: 1rem;
      text-align: center;
    }

    .login-link a {
      color: #3498db;
      text-decoration: none;
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      mail: ['', [Validators.required, Validators.email]],
      companyName: ['', [Validators.required]],
      companySector: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData: SignupPayload = {
        firstName: this.registerForm.get('firstName')?.value || '',
        lastName: this.registerForm.get('lastName')?.value || '',
        username: this.registerForm.get('username')?.value || '',
        mail: this.registerForm.get('mail')?.value || '',
        companyName: this.registerForm.get('companyName')?.value || '',
        companySector: this.registerForm.get('companySector')?.value || '',
        password: this.registerForm.get('password')?.value || '',
        confirmPassword: this.registerForm.get('confirmPassword')?.value || ''
      };

      this.authService.register(formData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription';
        }
      });
    }
  }
}
