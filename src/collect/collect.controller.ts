import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CollectService } from './collect.service';
import { CreateCollectDto, UpdateCollectStatusDto } from './dtos/collectDTO';
import { CollectStatusType } from './collectTypes';

@Controller('collects')
export class CollectController {
  constructor(private service: CollectService) {}

  @Post()
  create(@Body() dto: CreateCollectDto) {
    return this.service.create(dto);
  }
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Get('user/:id')
  findByUserId(@Param('id', ParseIntPipe) userId: number) {
    return this.service.findByUserId(userId);
  }
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCollectStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }

  @Patch(':id/cancel')
  cancel(
    @Param('id', ParseIntPipe) id: number,
    dto: CollectStatusType = 'CANCELED',
  ) {
    return this.service.cancel(id, dto);
  }
}
