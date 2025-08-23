export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  eventId?: string;
  userId: string;
  stripePaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
} 