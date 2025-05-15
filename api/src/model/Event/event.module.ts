import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventService } from './services/event.service';
import { Event } from './entities/event.entity';
import { EventParticipation } from './entities/event-participation.entity';
import { SecurityModule } from '@feature/security/security.module';
import { PaymentModule } from '../Payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventParticipation]),
    SecurityModule,
    PaymentModule
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {} 