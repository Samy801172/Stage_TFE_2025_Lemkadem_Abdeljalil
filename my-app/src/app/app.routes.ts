import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/admin.guard';
import { CalendarComponent } from './features/calendar/components/calendar.component';
import { PAYMENT_ROUTES } from './features/payment/payment.routes';

export const routes: Routes = [
  // Route par défaut - redirige vers la page de connexion
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'  // Correspond exactement au chemin vide
  },

  // Module d'authentification (connexion, inscription)
  {
    path: 'auth',
    // Chargement paresseux (lazy loading) du module d'authentification
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Dashboard des membres
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/dashboard/components/member-dashboard.component')
      .then(m => m.MemberDashboardComponent)
  },

  // Section administrative
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },

  {
    path: 'agenda',
    component: CalendarComponent
  },

  {
    path: 'payment',
    children: PAYMENT_ROUTES
  },

  {
    path: 'events/:id',
    loadComponent: () => import('./features/events/components/event-detail/event-detail.component')
      .then(m => m.EventDetailComponent)
  },

  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
]; 