import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailModule } from '../../common/services/mail.module';
import { Credential } from '../../feature/security/data/entity/credential.entity';
import { NotFoundException } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credential]), MailModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
