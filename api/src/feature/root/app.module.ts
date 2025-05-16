import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../common/config/typeorm.config';
import { UserModule } from '../../model/User/user.module';
import { EventModule } from '../../model/Event/event.module';
import { MessageModule } from '../../model/Message/message.module';
import { ReviewModule } from '../../model/Review/review.module';
import { NotificationModule } from '../../model/Notification/notification.module';
import { PaymentModule } from '../../model/Payment/payment.module';
import { BadgeModule } from '../../model/Badge/badge.module';
import { DocumentModule } from '../../model/Document/document.module';
import { SecurityModule } from '../security/security.module';
import { AccountModule } from '../../model/Account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    EventModule,
    MessageModule,
    ReviewModule,
    NotificationModule,
    PaymentModule,
    BadgeModule,
    DocumentModule,
    SecurityModule,
    AccountModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
