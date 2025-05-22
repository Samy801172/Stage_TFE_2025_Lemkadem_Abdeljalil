import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { DocumentController } from './document.controller';
import { MailModule } from '../../common/services/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    MailModule
  ],
  controllers: [DocumentController],
  providers: [],
  exports: []
})
export class DocumentModule {} 