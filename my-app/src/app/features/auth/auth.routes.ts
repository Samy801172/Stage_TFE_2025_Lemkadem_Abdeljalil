import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { GoogleCallbackComponent } from './components/google-callback/google-callback.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: GoogleLoginComponent
  },
  { path: 'google/callback', component: GoogleCallbackComponent },
]; 