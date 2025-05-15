import { Controller, Post, Body, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

// Interface pour étendre Request avec l'utilisateur
interface RequestWithUser extends Request {
  user?: {
    userId: string;
  };
}

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-session')
  @ApiResponse({ status: 201, description: 'Session de paiement créée avec succès' })
  async createPaymentSession(@Body() data: { eventId: string }, @Req() req: RequestWithUser) {
    const userId = req.user?.userId;
    return this.paymentService.createPaymentSession(data.eventId, userId);
  }

  @Post('webhook')
  @ApiResponse({ status: 200, description: 'Webhook traité avec succès' })
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>,
  ) {
    try {
      // Récupère le corps brut de la requête pour vérifier la signature
      const payload = request.rawBody;

      // Traite le webhook avec vérification de signature
      const result = await this.paymentService.handleWebhook(signature, payload);

      return { received: true, ...result };
    } catch (error) {
      // Log l'erreur mais renvoie 200 pour éviter les retries de Stripe
      console.error('Webhook error:', error.message);
      return {
        received: true,
        error: error.message
      };
    }
  }

  // Endpoint de secours pour les tests en développement
  @Post('dev/complete-payment')
  @ApiResponse({ status: 200, description: 'Paiement simulé avec succès' })
  async simulatePaymentSuccess(@Body() data: { eventId: string }, @Req() req: RequestWithUser) {
    const userId = req.user?.userId;
    return this.paymentService.simulateSuccessfulPayment(data.eventId, userId);
  }
} 