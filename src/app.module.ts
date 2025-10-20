import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { CustomMailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UserModule,
    ForgotPasswordModule,
    CustomMailerModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
