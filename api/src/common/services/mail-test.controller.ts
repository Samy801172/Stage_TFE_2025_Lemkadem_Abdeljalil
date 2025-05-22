import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('test-mail')
export class MailTestController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async sendTestMail() {
    await this.mailService.sendMail(
      'test@exemple.com',
      'Test Mailtrap',
      'Ceci est un email de test envoyé via Mailtrap !'
    );
    return { message: 'Email envoyé !' };
  }
} 