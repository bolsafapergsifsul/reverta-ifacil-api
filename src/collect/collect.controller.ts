import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

  // @Get('user/:id')
  // findByUserId(@Param('id', ParseIntPipe) userId: number) {
  //   return this.service.findByUserId(userId);
  // }

  @Get('user/:id')
  findByUserWithFilter(
    @Param('id') id: number,
    @Query('status') status?: CollectStatusType,
  ) {
    return this.service.findByIdWithFilter(Number(id), status);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCollectStatusDto,
  ) {
    return this.service.updateStatus(Number(id), dto);
  }

  // @Patch(':id/cancel')
  // cancel(
  //   @Param('id', ParseIntPipe) id: number,
  //   dto: CollectStatusType = 'CANCELED',
  // ) {
  //   return this.service.cancel(Number(id), dto);
  // }
  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.service.cancel(Number(id));
  }

  @Patch(':id')
  updateDataCollect(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateCollectDto>,
  ) {
    return this.service.updateDataCollect(Number(id), dto);
  }
}
