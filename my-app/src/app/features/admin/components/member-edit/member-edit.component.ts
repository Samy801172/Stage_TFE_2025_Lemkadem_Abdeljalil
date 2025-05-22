import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MemberService } from '@core/services/member.service';
import { Member } from '@core/models/member.model';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="edit-member-container">
      <div class="form-header">
        <h2>Modifier le membre</h2>
        <a routerLink="/admin/members" class="back-link">← Retour</a>
      </div>

      <div *ngIf="!memberLoaded" class="loading">
        <p>Chargement du membre...</p>
        <p class="loading-details">ID du membre : {{ memberId }}</p>
      </div>

      <form *ngIf="memberLoaded" [formGroup]="memberForm" (ngSubmit)="onSubmit()" class="member-form">
        <div class="form-section">
          <h3>Informations personnelles</h3>
          
          <div class="form-group">
            <label for="firstName">Prénom</label>
            <input 
              id="firstName" 
              type="text" 
              formControlName="firstName"
              placeholder="Prénom"
              [class.error]="isFieldInvalid('firstName')">
          </div>

          <div class="form-group">
            <label for="lastName">Nom</label>
            <input 
              id="lastName" 
              type="text" 
              formControlName="lastName"
              placeholder="Nom"
              [class.error]="isFieldInvalid('lastName')">
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              id="email" 
              type="email" 
              formControlName="email"
              placeholder="Email"
              [class.error]="isFieldInvalid('email')">
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              Email invalide
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Informations professionnelles</h3>
          
          <div class="form-group">
            <label for="company">Entreprise</label>
            <input 
              id="company" 
              type="text" 
              formControlName="company"
              placeholder="Nom de l'entreprise">
          </div>

          <div class="form-group">
            <label for="position">Position</label>
            <input 
              id="position" 
              type="text" 
              formControlName="position"
              placeholder="Position">
          </div>
        </div>

        <div class="form-section">
          <h3>Liens et réseaux</h3>
          
          <div class="form-group">
            <label for="linkedinUrl">LinkedIn</label>
            <input 
              id="linkedinUrl" 
              type="url" 
              formControlName="linkedinUrl"
              placeholder="URL LinkedIn">
          </div>

          <div class="form-group">
            <label for="website">Site web</label>
            <input 
              id="website" 
              type="url" 
              formControlName="website"
              placeholder="URL du site web">
          </div>
        </div>

        <div class="form-section">
          <h3>Biographie</h3>
          
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea 
              id="bio" 
              formControlName="bio"
              placeholder="Biographie"
              rows="4"></textarea>
          </div>
        </div>

        <div class="form-section">
          <h3>Statut du compte</h3>
          
          <div class="form-group">
            <label>
              <input 
                type="checkbox" 
                formControlName="isActive">
              Compte actif
            </label>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="onCancel()">Annuler</button>
          <button 
            type="submit" 
            class="btn-submit"
            [disabled]="!memberForm.valid || isSubmitting">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-member-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .form-header h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }

    .back-link {
      text-decoration: none;
      color: #666;
      font-weight: 500;
      transition: color 0.2s;
    }

    .back-link:hover {
      color: #333;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .loading-details {
      font-size: 0.9rem;
      color: #999;
      margin-top: 0.5rem;
    }

    .form-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .form-section h3 {
      margin: 0 0 1.5rem 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 500;
    }

    input[type="text"],
    input[type="email"],
    input[type="url"],
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 1rem;
      transition: all 0.2s;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .error {
      border-color: #e74c3c !important;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
    }

    button {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-cancel {
      background: #e0e0e0;
      border: none;
      color: #333;
    }

    .btn-submit {
      background: #3498db;
      border: none;
      color: white;
    }

    .btn-cancel:hover {
      background: #d5d5d5;
    }

    .btn-submit:hover {
      background: #2980b9;
    }

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .edit-member-container {
        margin: 1rem;
        padding: 1rem;
      }

      .form-actions {
        flex-direction: column;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class MemberEditComponent implements OnInit {
  memberForm: FormGroup;
  isSubmitting = false;
  memberLoaded = false;
  memberId: string | null = null;
  member: Member | null = null;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.memberForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      position: [''],
      bio: [''],
      linkedinUrl: [''],
      website: [''],
      isActive: [true]
    });
  }

  ngOnInit() {
    console.log('MemberEditComponent initialized');
    this.route.params.subscribe(params => {
      const memberId = params['id'];
      console.log('Member ID from route:', memberId);
      if (memberId) {
        this.memberId = memberId;
        this.loadMember(memberId);
      }
    });
  }

  loadMember(id: string) {
    console.log('[MemberEditComponent] Loading member with ID:', id);
    this.memberService.getMemberById(id).subscribe({
      next: (member) => {
        console.log('[MemberEditComponent] Member data received:', member);
        if (!member) {
          console.error('[MemberEditComponent] Member data is null or undefined');
          alert('Erreur: Membre non trouvé');
          this.router.navigate(['/admin/members']);
          return;
        }

        // Patch chaque champ individuellement pour éviter les undefined
        this.memberForm.patchValue({
          firstName: member.firstName || '',
          lastName: member.lastName || '',
          email: member.email || '',
          company: member.company || '',
          position: member.position || '',
          bio: member.bio || '',
          linkedinUrl: member.linkedinUrl || '',
          website: member.website || '',
          isActive: member.isActive ?? true
        });

        console.log('[MemberEditComponent] Form values after patch:', this.memberForm.value);
        this.memberLoaded = true;
        this.member = member;
      },
      error: (error) => {
        console.error('[MemberEditComponent] Error loading member:', error);
        alert('Erreur lors du chargement du membre');
        this.router.navigate(['/admin/members']);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.memberForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.memberForm.valid && !this.isSubmitting && this.memberId) {
      this.isSubmitting = true;
      const formValue = this.memberForm.value;
      
      // Créer l'objet de mise à jour
      const memberUpdate = {
        firstName: formValue.firstName?.trim(),
        lastName: formValue.lastName?.trim(),
        email: formValue.email?.trim(),
        company: formValue.company?.trim(),
        position: formValue.position?.trim(),
        bio: formValue.bio?.trim(),
        linkedinUrl: formValue.linkedinUrl?.trim(),
        website: formValue.website?.trim(),
        isActive: formValue.isActive,
        role: this.member?.role
      };

      console.log('Updating member with data:', memberUpdate);

      this.memberService.updateMember(this.memberId, memberUpdate).subscribe({
        next: () => {
          console.log('Member updated successfully');
          this.notificationService.success('Membre mis à jour avec succès');
          this.notificationService.success('Email envoyé au membre');
          this.router.navigate(['/admin/members']);
        },
        error: (error: unknown) => {
          console.error('Error updating member:', error);
          alert('Erreur lors de la mise à jour du membre');
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel() {
    if (confirm('Êtes-vous sûr de vouloir annuler les modifications ?')) {
      this.router.navigate(['/admin/members']);
    }
  }
} 