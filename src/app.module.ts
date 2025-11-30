import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { CustomMailerModule } from './mailer/mailer.module';
import { EcoPointModule } from './eco-point/eco-point.module';
import { AddressModule } from './address/address.module';
import { MaterialModule } from './material/material.module';
import { CollectModule } from './collect/collect.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    UserModule,
    ForgotPasswordModule,
    CustomMailerModule,
    EcoPointModule,
    AddressModule,
    MaterialModule,
    CollectModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
