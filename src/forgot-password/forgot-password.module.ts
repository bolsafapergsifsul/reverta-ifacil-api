import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';

@Module({
  providers: [ForgotPasswordService, PrismaService],
  controllers: [ForgotPasswordController],
})
export class ForgotPasswordModule {}
