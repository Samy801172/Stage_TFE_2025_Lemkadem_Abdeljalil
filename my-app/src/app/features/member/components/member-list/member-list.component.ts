import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="member-list-container">
      <h2>Network Members</h2>
      <div class="search-bar">
        <input type="text" placeholder="Search members..." (input)="onSearch($event)">
      </div>
      <div class="member-grid">
        <div *ngFor="let member of members" class="member-card" [routerLink]="['/member', member.id]">
          <img [src]="member.profilePicture || 'assets/default-avatar.png'" alt="Profile picture">
          <h3>{{member.firstName}} {{member.lastName}}</h3>
          <p>{{member.companyName}}</p>
          <p class="sector">{{member.companySector}}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .member-list-container {
      padding: 2rem;
    }
    .search-bar {
      margin-bottom: 2rem;
    }
    .search-bar input {
      width: 100%;
      max-width: 500px;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .member-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }
    .member-card {
      padding: 1.5rem;
      border-radius: 8px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .member-card:hover {
      transform: translateY(-2px);
    }
    .member-card img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
    }
  `]
})
export class MemberListComponent implements OnInit {
  members: User[] = [];

  ngOnInit() {
    // Implement member fetching logic
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    // Implement search logic
  }
} 