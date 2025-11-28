import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMaterialDTO, UpdateMaterialDTO } from './dto/materialDTO';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.material.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: number) {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      throw new BadRequestException('Material not found');
    }
    return material;
  }

  async create(data: CreateMaterialDTO) {
    const material = await this.prisma.material.findUnique({
      where: { name: data.name },
    });

    if (material) {
      throw new BadRequestException('Este material já existe');
    }
    return await this.prisma.material.create({
      data,
    });
  }

  async update(id: number, data: UpdateMaterialDTO) {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      throw new BadRequestException('Material not found');
    }
    return await this.prisma.material.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      throw new BadRequestException('Material not found');
    }
    return await this.prisma.material.delete({
      where: { id },
    });
  }
}
