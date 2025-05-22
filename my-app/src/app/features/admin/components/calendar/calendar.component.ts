import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <h2>Calendrier des événements</h2>
        <button class="create-btn" routerLink="/admin/events/create">+ Nouvel événement</button>
      </div>

      <div class="region-selector">
        <i class="fas fa-map-marker-alt"></i>
        <span>Sélectionnez une région BTP</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 1rem;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .create-btn {
      padding: 0.5rem 1rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .create-btn:hover {
      background: #27ae60;
    }

    .region-selector {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #ff7675;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .region-selector i {
      font-size: 1.2rem;
    }
  `]
})
export class CalendarComponent {} 