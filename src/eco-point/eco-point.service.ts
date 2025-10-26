import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EcoPointType, EcoPointTypeFormatted } from './ecoPointTypes';
import { EcoPointDTO } from './dtos/ecoPointDTOS';

@Injectable()
export class EcoPointService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<EcoPointTypeFormatted[]> {
    const ecoPoints = await this.prismaService.ecoPoint.findMany({});
    const ecoPointsFormatted = ecoPoints.map((ecoPoint) => ({
      id: ecoPoint.id,
      name: ecoPoint.name,
      zipCode: ecoPoint.zipCode,
      street: ecoPoint.street,
      numberAddress: ecoPoint.numberAddress,
      complement: ecoPoint.complement,
      neighborhood: ecoPoint.neighborhood,
      city: ecoPoint.city,
      state: ecoPoint.state,
      latitude: ecoPoint.latitude,
      longitude: ecoPoint.longitude,
      phone: ecoPoint.phone,
      serviceHours: ecoPoint.serviceHours,
    }));

    return ecoPointsFormatted;
  }
  findById(id: number): Promise<EcoPointType | null> {
    const ecoPoint = this.prismaService.ecoPoint.findUnique({
      where: { id },
    });

    return ecoPoint;
  }

  async create(data: EcoPointDTO) {
    const ecoPoint = await this.prismaService.ecoPoint.create({
      data: {
        ...data,
      },
    });
    return {
      id: ecoPoint.id,
      name: ecoPoint.name,
      zipCode: ecoPoint.zipCode,
      street: ecoPoint.street,
      numberAddress: ecoPoint.numberAddress,
      complement: ecoPoint.complement,
      neighborhood: ecoPoint.neighborhood,
      city: ecoPoint.city,
      state: ecoPoint.state,
      latitude: ecoPoint.latitude,
      longitude: ecoPoint.longitude,
      phone: ecoPoint.phone,
      serviceHours: ecoPoint.serviceHours,
      collectionsInfo: ecoPoint.collectionsInfo,
      typeMaterials: ecoPoint.typeMaterials,
    };
  }

  async updateEcoPoint(
    id: number,
    data: Partial<EcoPointType>,
  ): Promise<EcoPointType> {
    const ecoPoint = await this.prismaService.ecoPoint.findUnique({
      where: { id },
    });

    if (!ecoPoint) {
      throw new Error('EcoPoint não encontrado');
    }

    const updatedEcoPoint = await this.prismaService.ecoPoint.update({
      where: { id },
      data,
    });
    return updatedEcoPoint;
  }

  async removeEcoPoint(id: number) {
    const deletedEcoPoint = await this.prismaService.ecoPoint.delete({
      where: { id },
    });
    return deletedEcoPoint;
  }
}
