import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EcoPointType } from './ecoPointTypes';
import { EcoPointDTO } from './dtos/ecoPointDTOS';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class EcoPointService {
  constructor(
    private prismaService: PrismaService,
    private addressService: AddressService,
  ) {}
  async findAll(): Promise<EcoPointType[]> {
    const ecoPoints = await this.prismaService.ecoPoint.findMany({
      include: {
        materialsCollected: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return ecoPoints.map((ecoPoint) => ({
      id: ecoPoint.id,
      name: ecoPoint.name,
      zipCode: ecoPoint.zipCode,
      street: ecoPoint.street,
      numberAddress: ecoPoint.numberAddress,
      complement: ecoPoint.complement,
      neighborhood: ecoPoint.neighborhood,
      city: ecoPoint.city,
      state: ecoPoint.state,
      latitude: ecoPoint.latitude ? Number(ecoPoint.latitude) : null,
      longitude: ecoPoint.longitude ? Number(ecoPoint.longitude) : null,
      phoneNumber: ecoPoint.phoneNumber,
      serviceHours: ecoPoint.serviceHours,
      infos: ecoPoint.infos,
      images: ecoPoint.images,
      materialsCollected: ecoPoint.materialsCollected,
    }));
  }

  async findById(id: number): Promise<EcoPointType> {
    const ecoPoint = await this.prismaService.ecoPoint.findUnique({
      where: { id },
      include: {
        materialsCollected: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!ecoPoint) {
      throw new BadRequestException('EcoPoint não encontrado');
    }

    return {
      ...ecoPoint,
      latitude: ecoPoint.latitude ? Number(ecoPoint.latitude) : null,
      longitude: ecoPoint.longitude ? Number(ecoPoint.longitude) : null,
      materialsCollected: ecoPoint.materialsCollected,
    };
  }

  async create(data: EcoPointDTO) {
    const address = await this.addressService.getCompleteAddress(
      data.zipCode,
      data.numberAddress,
    );

    const ecoPoint = await this.prismaService.ecoPoint.create({
      data: {
        name: data.name,
        zipCode: address.zipCode,
        street: address.street,
        numberAddress: address.numberAddress,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        complement: '',
        latitude: address.latitude,
        longitude: address.longitude,
        serviceHours: data.serviceHours,
        phoneNumber: data.phoneNumber,
        infos: data.infos,
        images: data.images,

        materialsCollected: {
          connect: data.materialsId.map((id) => ({ id: Number(id) })),
        },
      },
      include: {
        materialsCollected: true,
      },
    });

    return ecoPoint;
  }

  async updateEcoPoint(
    id: number,
    data: Omit<EcoPointType, 'id' | 'materialsCollected'>,
  ): Promise<EcoPointType> {
    const ecoPoint = await this.prismaService.ecoPoint.findUnique({
      where: { id },
    });

    if (!ecoPoint) {
      throw new BadRequestException('EcoPoint não encontrado');
    }

    const updatedEcoPoint = await this.prismaService.ecoPoint.update({
      where: { id },
      data,
    });

    return {
      ...updatedEcoPoint,
      latitude: updatedEcoPoint.latitude
        ? Number(updatedEcoPoint.latitude)
        : null,
      longitude: updatedEcoPoint.longitude
        ? Number(updatedEcoPoint.longitude)
        : null,
    };
  }

  async removeEcoPoint(id: number) {
    return this.prismaService.ecoPoint.delete({
      where: { id },
    });
  }
}
