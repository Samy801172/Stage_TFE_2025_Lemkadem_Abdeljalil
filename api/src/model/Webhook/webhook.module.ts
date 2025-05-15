import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from '../Payment/payment.module';

@Module({
  imports: [
    ConfigModule,
    PaymentModule
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
  exports: [WebhookService]
})
export class WebhookModule {} 