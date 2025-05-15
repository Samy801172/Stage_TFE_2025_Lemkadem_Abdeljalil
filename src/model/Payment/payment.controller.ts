import { Controller, Post, Body, UseGuards, Req, Headers, ForbiddenException, Logger, Get, Query } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { JwtAuthGuard } from '@feature/security/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from '@common/config';
import { RolesGuard } from '@feature/security/guards/roles.guard';
import { Roles } from '@feature/security/decorators/roles.decorator';
import { UserRole } from '@model/User/entities/user-role.enum';
import { Request } from 'express';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-session')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MEMBER, UserRole.ADMIN)
  async createPaymentSession(
    @Req() req,
    @Body('eventId') eventId: string
  ): Promise<{ url: string }> {
    const isAdmin = req.user.role === UserRole.ADMIN;
    this.logger.log(`Création de session de paiement par ${isAdmin ? 'ADMIN' : 'USER'} pour l'événement: ${eventId}`);
    const url = await this.paymentService.createPaymentSession(eventId, req.user.userId, isAdmin);
    return { url };
  }

  @Post('webhook')
  @Public()
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: Request
  ) {
    try {
      const payload = (request as any).rawBody;
      
      if (!payload) {
        this.logger.error('Pas de corps de requête brut trouvé');
        return { received: false, error: 'No raw body found' };
      }

      if (!signature) {
        this.logger.error('Pas de signature Stripe trouvée');
        return { received: false, error: 'No Stripe signature found' };
      }

      const result = await this.paymentService.handleWebhook(signature, payload);
      this.logger.log('Webhook traité avec succès');
      return { received: true, ...result };
    } catch (error) {
      this.logger.error('Erreur webhook:', error.message);
      // On renvoie 200 même en cas d'erreur pour éviter les retries de Stripe
      return { 
        received: true, 
        error: error.message,
        handled: false
      };
    }
  }

  @Post('create-admin-session')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createAdminPaymentSession(
    @Req() req,
    @Body('eventId') eventId: string,
    @Body('userId') userId: string
  ): Promise<{ url: string }> {
    this.logger.log(`Création de session de paiement par ADMIN pour l'utilisateur: ${userId}, événement: ${eventId}`);
    const url = await this.paymentService.createPaymentSession(eventId, userId, true);
    return { url };
  }

  @Post('dev/complete-payment')
  @Public()
  @ApiOperation({ summary: 'Endpoint de développement pour simuler un paiement complet' })
  async simulatePaymentCompletion(
    @Body() data: { eventId: string, userId: string }
  ) {
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException('Cet endpoint est uniquement disponible en développement');
    }

    try {
      const result = await this.paymentService.simulateSuccessfulPayment(data.eventId, data.userId);
      return {
        success: true,
        message: 'Paiement simulé avec succès',
        data: result
      };
    } catch (error) {
      this.logger.error('Erreur lors de la simulation du paiement:', error);
      throw error;
    }
  }

  @Get('success')
  @Public()
  async handlePaymentSuccess(
    @Query('session_id') sessionId: string
  ) {
    this.logger.log(`📝 Page de succès accédée avec session: ${sessionId}`);
    return {
      success: true,
      message: 'Paiement effectué avec succès',
      sessionId
    };
  }
} 