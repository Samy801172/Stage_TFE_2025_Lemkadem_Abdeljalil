import { Controller, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { Roles } from '@core/decorators/roles.decorator';
import { UserRole } from '@core/enums/user-role.enum';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-intent')
  @Roles(UserRole.MEMBER)
  async createPaymentIntent(@Request() req, @Body() { eventId }: { eventId: string }) {
    console.log('Creating payment intent for event:', eventId);
    return this.paymentService.createPaymentIntent(eventId, req.user.userId);
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.paymentService.handleWebhook(payload);
  }

  @Post('confirm/:eventId')
  @Roles(UserRole.MEMBER)
  async confirmPayment(
    @Request() req,
    @Param('eventId') eventId: string,
    @Body() { paymentIntentId }: { paymentIntentId: string }
  ) {
    return this.paymentService.confirmPayment(eventId, req.user.userId, paymentIntentId);
  }
} 