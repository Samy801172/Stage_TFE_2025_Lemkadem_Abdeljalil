import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './payment.controller';
import { Event } from '../Event/entities/event.entity';
import { User } from '../User/entities/user.entity';
import { EventParticipation } from '../Event/entities/event-participation.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Event, User, EventParticipation]),
    ConfigModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {} 