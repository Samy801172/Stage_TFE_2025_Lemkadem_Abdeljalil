import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { MemberService } from '@core/services/member.service';
import { EventService } from '@core/services/event.service';
import { ImageService } from '@core/services/image.service';
import { Member } from '@core/models/member.model';
import { Event } from '@core/models/event.model';
import { Subject, combineLatest, Observable } from 'rxjs';
import { takeUntil, catchError, finalize, distinctUntilChanged, shareReplay, map } from 'rxjs/operators';
import { User, mapUserToMember } from '@core/models/user.model';
import { Router } from '@angular/router';
import { MemberRefreshService } from '@core/services/member-refresh.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  // États de chargement et d'erreur
  loading = {
    members: false,
    events: false
  };

  error = {
    members: null as string | null,
    events: null as string | null
  };

  // Liste des membres actifs affichés sur le dashboard
  members: Member[] = [];
  events: Event[] = [];
  currentUser: User | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private memberService: MemberService,
    private eventService: EventService,
    public imageService: ImageService,
    private router: Router,
    private memberRefreshService: MemberRefreshService
  ) {
    // S'abonner aux changements de l'utilisateur courant
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        // On stocke l'utilisateur courant pour affichage, mais on ne fait PAS de redirection ici !
        // La redirection doit être faite après le login, dans le service d'authentification.
        if (user) {
          this.currentUser = user;
        }
      });
  }

  ngOnInit(): void {
    this.loadInitialData();
    // S'abonne au refresh des membres (notifié par le composant membres)
    this.memberRefreshService.refresh$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadMembers(); // recharge la liste des membres actifs
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    this.loadMembers();
    this.loadEvents();
  }

  /**
   * Charge uniquement les membres actifs pour le dashboard
   * Appelée au chargement et à chaque changement de statut d'un membre
   */
  loadMembers(): void {
    this.loading.members = true;
    this.error.members = null;

    // On récupère uniquement les membres actifs
    this.memberService.getActiveMembers()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.members = false)
      )
      .subscribe({
        next: (members: Member[]) => {
          this.members = members;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des membres:', err);
          this.error.members = 'Impossible de charger les membres. Veuillez réessayer.';
        }
      });
  }

  loadEvents(): void {
    this.loading.events = true;
    this.error.events = null;

    this.eventService.getUpcomingEvents()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading.events = false)
      )
      .subscribe({
        next: (events) => {
          this.events = events;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des événements:', err);
          this.error.events = 'Impossible de charger les événements. Veuillez réessayer.';
        }
      });
  }

  retry(): void {
    this.loadInitialData();
  }

  logout(): void {
    this.authService.logout();
  }
} 