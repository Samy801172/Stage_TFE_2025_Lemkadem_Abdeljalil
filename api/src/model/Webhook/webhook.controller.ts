import { Body, Controller, Headers, Post, Logger, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '@common/config';
import { RawBodyRequest } from '@common/decorators/raw-body-request.decorator';
import { WebhookService } from './webhook.service';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly webhookService: WebhookService
  ) {}

  @Post('github')
  @Public()
  @ApiOperation({ summary: 'Webhook pour GitHub' })
  async handleGithubWebhook(
    @Headers('x-hub-signature-256') signature: string,
    @Headers('x-github-event') event: string,
    @RawBodyRequest() rawBody: Buffer,
    @Body() payload: any
  ) {
    this.logger.debug(`Webhook GitHub reçu: ${event}`);
    
    try {
      // Vérifier la signature
      const isValid = this.webhookService.verifyGithubSignature(signature, rawBody);
      if (!isValid) {
        this.logger.warn('Signature GitHub invalide');
        throw new UnauthorizedException('Signature invalide');
      }

      // Traiter l'événement
      await this.webhookService.processGithubWebhook(event, payload);

      return { success: true, message: `Webhook GitHub ${event} traité avec succès` };
    } catch (error) {
      this.logger.error(`Erreur traitement webhook GitHub: ${error.message}`);
      throw error;
    }
  }

  @Post('stripe')
  @Public()
  @ApiOperation({ summary: 'Webhook pour Stripe' })
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @RawBodyRequest() rawBody: Buffer
  ) {
    this.logger.debug('Webhook Stripe reçu');
    
    try {
      // Déléguer au service de webhook qui va ensuite appeler le service de paiement
      const result = await this.webhookService.processStripeWebhook(signature, rawBody);
      return result;
    } catch (error) {
      this.logger.error(`Erreur traitement webhook Stripe: ${error.message}`);
      throw error;
    }
  }

  @Post('custom')
  @Public()
  @ApiOperation({ summary: 'Webhook personnalisé' })
  async handleCustomWebhook(
    @Headers('x-webhook-signature') signature: string,
    @Headers('x-webhook-source') source: string,
    @RawBodyRequest() rawBody: Buffer,
    @Body() payload: any
  ) {
    this.logger.debug(`Webhook personnalisé reçu de: ${source || 'inconnu'}`);
    
    try {
      // Vérification de signature (optionnelle selon la source)
      if (signature && source) {
        const isValid = this.webhookService.verifyCustomSignature(signature, rawBody, source);
        if (!isValid) {
          this.logger.warn(`Signature invalide pour la source: ${source}`);
          throw new UnauthorizedException('Signature invalide');
        }
      }

      // Traiter le webhook
      await this.webhookService.processCustomWebhook(source, payload);

      return { success: true, message: `Webhook ${source || 'personnalisé'} traité avec succès` };
    } catch (error) {
      this.logger.error(`Erreur traitement webhook personnalisé: ${error.message}`);
      throw error;
    }
  }
} 