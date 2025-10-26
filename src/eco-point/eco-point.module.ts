import { Module } from '@nestjs/common';
import { EcoPointService } from './eco-point.service';
import { EcoPointController } from './eco-point.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [EcoPointService, PrismaService],
  controllers: [EcoPointController],
})
export class EcoPointModule {}
