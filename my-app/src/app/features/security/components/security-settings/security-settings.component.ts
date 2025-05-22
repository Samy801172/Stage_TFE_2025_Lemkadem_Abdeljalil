import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-security-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="security-container">
      <h2>Security Settings</h2>
      
      <section class="security-section">
        <h3>Change Password</h3>
        <form [formGroup]="passwordForm" (ngSubmit)="onPasswordChange()">
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <input id="currentPassword" type="password" formControlName="currentPassword">
          </div>
          
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input id="newPassword" type="password" formControlName="newPassword">
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <input id="confirmPassword" type="password" formControlName="confirmPassword">
          </div>
          
          <button type="submit" [disabled]="passwordForm.invalid">Update Password</button>
        </form>
      </section>

      <section class="security-section">
        <h3>Two-Factor Authentication</h3>
        <button (click)="toggleTwoFactor()">
          {{ twoFactorEnabled ? 'Disable' : 'Enable' }} Two-Factor Authentication
        </button>
      </section>
    </div>
  `,
  styles: [`
    .security-container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
    }
    .security-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
    }
  `]
})
export class SecuritySettingsComponent {
  passwordForm: FormGroup;
  twoFactorEnabled = false;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onPasswordChange() {
    if (this.passwordForm.valid) {
      // Implement password change logic
      console.log('Password change:', this.passwordForm.value);
    }
  }

  toggleTwoFactor() {
    this.twoFactorEnabled = !this.twoFactorEnabled;
    // Implement two-factor toggle logic
  }
} 