import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EcoPointService } from './eco-point.service';
import { EcoPointDTO } from './dtos/ecoPointDTOS';
import { EcoPointType, EcoPointTypeFormatted } from './ecoPointTypes';

@Controller('eco-point')
export class EcoPointController {
  constructor(private ecoPointService: EcoPointService) {}

  @Get()
  async getAllEcoPoints(): Promise<EcoPointTypeFormatted[] | null> {
    return await this.ecoPointService.findAll();
  }

  @Get(':id')
  async getEcoPointById(@Param('id') id: number): Promise<EcoPointType | null> {
    return await this.ecoPointService.findById(+id);
  }

  @Post('create')
  async create(@Body() data: EcoPointDTO) {
    return await this.ecoPointService.create(data);
  }
  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: Partial<EcoPointType>) {
    try {
      return await this.ecoPointService.updateEcoPoint(+id, data);
    } catch (error) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message || 'Erro ao atualizar ponto ecológico',
      );
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.ecoPointService.removeEcoPoint(+id);
  }
}
