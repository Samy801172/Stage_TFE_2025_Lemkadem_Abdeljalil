import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <nav class="admin-nav">
        <a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/admin/events" routerLinkActive="active">Événements</a>
        <a routerLink="/admin/members" routerLinkActive="active">Membres</a>
      </nav>
      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    .admin-nav {
      width: 250px;
      background: #2c3e50;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .admin-nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    .admin-nav a:hover,
    .admin-nav a.active {
      background: rgba(255,255,255,0.1);
    }
    .admin-content {
      flex: 1;
      padding: 2rem;
      background: #f5f5f5;
    }
  `]
})
export class AdminLayoutComponent {} 