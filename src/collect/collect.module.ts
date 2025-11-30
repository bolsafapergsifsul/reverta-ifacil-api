import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CollectService, PrismaService],
  controllers: [CollectController],
})
export class CollectModule {}
