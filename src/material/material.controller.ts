import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDTO, UpdateMaterialDTO } from './dto/materialDTO';

@Controller('materials')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Get()
  async getAll() {
    return this.materialService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.materialService.findById(id);
  }

  @Post()
  async create(@Body() data: CreateMaterialDTO) {
    return this.materialService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMaterialDTO,
  ) {
    return this.materialService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.materialService.delete(id);
  }
}
