import { Routes } from '@angular/router';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentCallbackComponent } from './components/payment-callback/payment-callback.component';
import { PaymentErrorComponent } from './components/payment-error/payment-error.component';
import { PaymentTestComponent } from './components/payment-test/payment-test.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { AuthGuard } from '@core/guards/auth.guard';

export const PAYMENT_ROUTES: Routes = [
  {
    path: 'test',
    component: PaymentTestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event/:id',
    component: PaymentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: PaymentCallbackComponent
  },
  {
    path: 'success',
    component: PaymentSuccessComponent
  },
  {
    path: 'error',
    component: PaymentErrorComponent
  }
]; 