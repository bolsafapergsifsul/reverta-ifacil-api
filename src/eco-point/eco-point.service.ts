import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EcoPointType, EcoPointUpdateType } from './ecoPointTypes';
import { EcoPointDTO, SearchNearbyEcoPointsDTO } from './dtos/ecoPointDTOS';
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
  // async getNearEcoPoints(query: SearchNearbyEcoPointsDTO) {
  //   let userLat: number;
  //   let userLng: number;

  //   if (query.zipdCode) {
  //     const address = await this.addressService.getCompleteAddress(
  //       query.zipdCode,
  //       '0',
  //     );

  //     userLat = address.latitude;
  //     userLng = address.longitude;
  //   } else if (query.latitude && query.longitude) {
  //     userLat = query.latitude;
  //     userLng = query.longitude;
  //   } else {
  //     throw new BadRequestException(
  //       'Você deve enviar um CEP ou latitude/longitude.',
  //     );
  //   }

  //   const ecoPoints = await this.prismaService.ecoPoint.findMany({});
  //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
  //     const R = 6371; // km
  //     const dLat = ((lat2 - lat1) * Math.PI) / 180;
  //     const dLon = ((lon2 - lon1) * Math.PI) / 180;

  //     const a =
  //       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //       Math.cos((lat1 * Math.PI) / 180) *
  //         Math.cos((lat2 * Math.PI) / 180) *
  //         Math.sin(dLon / 2) *
  //         Math.sin(dLon / 2);

  //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //     return R * c;
  //   };

  //   // -----------------------------------------
  //   // 5. Formatar + adicionar distância
  //   // -----------------------------------------
  //   const formatted = ecoPoints.map((eco) => ({
  //     id: eco.id,
  //     name: eco.name,
  //     distance: calculateDistance(
  //       userLat,
  //       userLng,
  //       Number(eco.latitude),
  //       Number(eco.longitude),
  //     ),
  //     zipCode: eco.zipCode,
  //     street: eco.street,
  //     numberAddress: eco.numberAddress,
  //     city: eco.city,
  //     state: eco.state,
  //     serviceHours: eco.serviceHours,
  //     phoneNumber: eco.phoneNumber,
  //     latitude: eco.latitude,
  //     longitude: eco.longitude,
  //   }));

  //   // -----------------------------------------
  //   // 6. Ordenar por distância ascendente
  //   // -----------------------------------------
  //   return formatted.sort((a, b) => a.distance - b.distance);
  // }

  async getNearEcoPoints(query: SearchNearbyEcoPointsDTO) {
    let userLat: number;
    let userLng: number;

    if (query.zipCode) {
      const address = await this.addressService.getCompleteAddress(
        query.zipCode,
        '0',
      );

      userLat = address.latitude;
      userLng = address.longitude;
    } else if (query.latitude && query.longitude) {
      userLat = query.latitude;
      userLng = query.longitude;
    } else {
      throw new BadRequestException(
        'Você deve enviar um CEP ou latitude/longitude.',
      );
    }

    const ecoPoints = await this.prismaService.ecoPoint.findMany({});

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    };

    // ----------------------------
    // 1) Formatar + adicionar distância
    // ----------------------------
    const formatted = ecoPoints.map((eco) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        Number(eco.latitude),
        Number(eco.longitude),
      );

      return {
        id: eco.id,
        name: eco.name,
        street: eco.street,
        numberAddress: eco.numberAddress,
        neighborhood: eco.neighborhood,
        phoneNumber: eco.phoneNumber,
        serviceHours: eco.serviceHours,
        distance,
      };
    });

    // ----------------------------
    // 2) Filtrar até 5 km
    // ----------------------------
    const filtered = formatted.filter((eco) => eco.distance <= 5);

    // ----------------------------
    // 3) Ordenar por distância
    // ----------------------------
    return filtered.sort((a, b) => a.distance - b.distance);
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
    data: Partial<EcoPointUpdateType>,
  ): Promise<EcoPointType> {
    const ecoPoint = await this.prismaService.ecoPoint.findUnique({
      where: { id },
    });

    if (!ecoPoint) {
      throw new BadRequestException('EcoPoint não encontrado');
    }

    const updateData: any = { ...data };
    let address;
    if (
      data.zipCode &&
      data.zipCode !== ecoPoint.zipCode &&
      data.numberAddress &&
      data.numberAddress !== ecoPoint.numberAddress
    ) {
      address = await this.addressService.getCompleteAddress(
        data.zipCode,
        data.numberAddress,
      );
    }

    // --- ATUALIZAÇÃO FINAL NO BANCO ---
    const updatedEcoPoint = await this.prismaService.ecoPoint.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        ...updateData,
        ...address,
      },
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
