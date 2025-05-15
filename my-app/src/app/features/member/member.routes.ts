import { Routes } from '@angular/router';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

export const MEMBER_ROUTES: Routes = [
  {
    path: '',
    component: MemberListComponent
  },
  {
    path: ':id',
    component: MemberDetailComponent
  }
]; 