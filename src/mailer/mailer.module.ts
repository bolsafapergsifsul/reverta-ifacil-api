import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.PASSWORD_APP,
        },
      },
      defaults: {
        from: `"Suporte Reverte Fácil" <${process.env.EMAIL_USER}>`,
      },
    }),
  ],
  exports: [MailerModule],
})
export class CustomMailerModule {}
