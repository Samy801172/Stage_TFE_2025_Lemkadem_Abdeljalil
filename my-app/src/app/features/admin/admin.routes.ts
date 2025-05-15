import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { AdminEventsComponent } from './components/events/admin-events.component';
import { EventEditComponent } from './components/events/event-edit.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminMembersComponent } from './components/members/admin-members.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'events',
        component: AdminEventsComponent
      },
      {
        path: 'events/create',
        component: EventCreateComponent
      },
      {
        path: 'events/edit/:id',
        component: EventEditComponent
      },
      {
        path: 'members',
        component: AdminMembersComponent
      },
      {
        path: 'members/:id',
        component: MemberEditComponent
      }
    ]
  }
]; 