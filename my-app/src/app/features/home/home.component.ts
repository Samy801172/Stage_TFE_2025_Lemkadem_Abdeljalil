import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '@core/services/event.service';
import { Event } from '@core/models/event.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  loading = true;
  error = false;
  currentYear: number = new Date().getFullYear();

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getUpcomingEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.loading = false;
      },
      error: (error) => {
        if (error?.error === 'User is not active') {
          this.error = true;
          this.loading = false;
        } else {
          this.loading = false;
        }
      }
    });
  }
} 