import { Module } from '@nestjs/common';
// Import de Mongoose pour MongoDB
import { MongooseModule } from '@nestjs/mongoose';
// Import de TypeORM pour PostgreSQL
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
    // Choix dynamique de la base de données selon l'environnement
    // En production (NODE_ENV=production), on utilise MongoDB (Mongoose)
    // En développement/local, on utilise PostgreSQL (TypeORM)
    ...(process.env.NODE_ENV === 'production'
      ? [
          // Connexion à MongoDB Atlas (production)
          MongooseModule.forRoot(process.env.MONGO_URI),
        ]
      : [
          // Connexion à PostgreSQL (local)
          TypeOrmModule.forRoot(typeOrmConfig),
        ]),
    // Modules métier communs
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
