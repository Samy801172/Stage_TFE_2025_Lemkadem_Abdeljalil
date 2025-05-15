import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="business-card-modal" *ngIf="isVisible" (click)="close()">
      <div class="business-card-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close()">×</button>
        
        <div class="card-header">
          <div class="profile-image">
            <img [src]="user?.profilePicture || 'assets/members/default.jpg'" 
                 [alt]="user?.firstName || user?.username"
                 (error)="handleImageError($event)">
          </div>
          <div class="user-info">
            <h2>{{ user?.firstName || user?.username }}</h2>
            <p class="status">MEMBRE ACTIF</p>
          </div>
        </div>

        <div class="card-body">
          <div class="contact-info">
            <p *ngIf="user?.mail">
              <i class="fas fa-envelope"></i>
              {{ user?.mail }}
            </p>
            <p *ngIf="user?.entreprise">
              <i class="fas fa-building"></i>
              {{ user?.entreprise }}
            </p>
            <p *ngIf="user?.phone">
              <i class="fas fa-phone"></i>
              {{ user?.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .business-card-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .business-card-content {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      width: 90%;
      max-width: 500px;
      position: relative;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
      padding: 0.5rem;
      line-height: 1;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      background: #f5f5f5;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .profile-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid #98FF98;
    }

    .profile-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info h2 {
      margin: 0;
      color: #2d3436;
      font-size: 1.5rem;
    }

    .status {
      margin: 0.5rem 0;
      color: #98FF98;
      font-weight: bold;
    }

    .card-body {
      border-top: 1px solid #f1f2f6;
      padding-top: 1.5rem;
    }

    .contact-info p {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 0.75rem 0;
      color: #2d3436;
    }

    .contact-info i {
      color: #98FF98;
      width: 20px;
      text-align: center;
    }
  `]
})
export class BusinessCardComponent {
  @Input() user: User | null = null;
  @Input() isVisible: boolean = false;

  handleImageError(event: any) {
    event.target.src = 'assets/members/default.jpg';
  }

  close() {
    this.isVisible = false;
  }
} 