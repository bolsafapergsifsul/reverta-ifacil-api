import { Module } from '@nestjs/common';
import { EcoPointService } from './eco-point.service';
import { EcoPointController } from './eco-point.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressModule } from 'src/address/address.module';

@Module({
  providers: [EcoPointService, PrismaService],
  controllers: [EcoPointController],
  imports: [AddressModule],
})
export class EcoPointModule {}
