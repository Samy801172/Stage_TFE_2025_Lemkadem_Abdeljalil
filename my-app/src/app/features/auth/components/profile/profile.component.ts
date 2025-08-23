import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="profile-container" *ngIf="user">
      <h2>Profil de {{user.username}}</h2>
      <div class="profile-info">
        <p>Email: {{user.mail}}</p>
        <p>Statut: {{user.active ? 'Actif' : 'Inactif'}}</p>
        <p>Role: {{user.isAdmin ? 'Administrateur' : 'Utilisateur'}}</p>
        <p>Créé le: {{user.created | date}}</p>
        <p>Dernière mise à jour: {{user.updated | date}}</p>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    input, textarea {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }
    textarea {
      resize: vertical;
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      companyName: [''],
      companySector: [''],
      bio: [''],
      linkedinUrl: [''],
      websiteUrl: ['']
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.profileForm.patchValue(user);
      },
      error: (error) => {
        console.error('Erreur lors du chargement du profil:', error);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid && this.profileForm.dirty) {
      // Implement update profile functionality in AuthService
      console.log('Profile update:', this.profileForm.value);
    }
  }
} 