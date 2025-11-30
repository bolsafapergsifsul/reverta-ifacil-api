import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CollectReturn, CollectStatusType } from './collectTypes';
import { CreateCollectDto, UpdateCollectStatusDto } from './dtos/collectDTO';

@Injectable()
export class CollectService {
  constructor(private prisma: PrismaService) {}

  private mapCollectReturn(result): CollectReturn {
    return {
      id: result.id,
      scheduledAt: result.scheduledAt.toString(),
      estimatedWeight: result.estimatedWeight ?? null,
      notes: result.notes ?? null,
      createdAt: result.createdAt.toString(),
      updatedAt: result.updatedAt.toString(),
      status: result.status,
      user: {
        id: result.user.id,
        name: result.user.name,
      },
      ecoPoint: {
        id: result.ecoPoint.id,
        name: result.ecoPoint.name,
      },
      materials: (result.materialsCollected || []).map((cm) => ({
        id: cm.id,
        quantity: cm.quantity ?? null,
        material: {
          id: cm.material.id,
          name: cm.material.name,
        },
      })),
    };
  }

  async create(data: CreateCollectDto): Promise<CollectReturn> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const ecoPoint = await this.prisma.ecoPoint.findUnique({
      where: { id: data.ecoPointId },
    });
    if (!ecoPoint) throw new BadRequestException('EcoPoint not found');

    const materialIds = data.materials.map((m) => Number(m.id));
    if (materialIds.length === 0) {
      throw new BadRequestException('At least one material is required');
    }
    const foundMaterials = await this.prisma.material.findMany({
      where: { id: { in: materialIds } },
      select: { id: true },
    });

    const foundIds = new Set(foundMaterials.map((m) => m.id));
    const missing = materialIds.filter((id) => !foundIds.has(id));
    if (missing.length > 0) {
      throw new BadRequestException(
        `Materials not found: ${missing.join(',')}`,
      );
    }
    const nestedMaterials = data.materials.map((m) => ({
      material: { connect: { id: Number(m.id) } },
      quantity: m.quantity ?? null,
    }));

    const created = await this.prisma.collect.create({
      data: {
        scheduledAt: new Date(data.scheduledAt),
        estimatedWeight: data.estimatedWeight ?? null,
        notes: data.notes ?? null,
        user: { connect: { id: data.userId } },
        ecoPoint: { connect: { id: data.ecoPointId } },
        materialsCollected: {
          create: nestedMaterials,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        ecoPoint: {
          select: {
            id: true,
            name: true,
          },
        },
        materialsCollected: {
          include: { material: { select: { id: true, name: true } } },
        },
      },
    });

    const collectReturn = this.mapCollectReturn(created);
    return collectReturn;
  }

  async findById(id: number): Promise<CollectReturn> {
    const result = await this.prisma.collect.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        ecoPoint: {
          select: {
            id: true,
            name: true,
          },
        },
        materialsCollected: {
          include: { material: { select: { id: true, name: true } } },
        },
      },
    });

    if (!result) throw new BadRequestException('Collect not found');

    const collect = this.mapCollectReturn(result);
    return collect;
  }

  async findByUserId(userId: number): Promise<CollectReturn[]> {
    const results = await this.prisma.collect.findMany({
      where: { userId },
      orderBy: { scheduledAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phoneNumber: true,
          },
        },
        ecoPoint: {
          select: {
            id: true,
            name: true,
          },
        },
        materialsCollected: {
          include: { material: { select: { id: true, name: true } } },
        },
      },
    });
    const collects = results.map((r) => this.mapCollectReturn(r));
    return collects;
  }

  async updateStatus(
    id: number,
    dto: UpdateCollectStatusDto,
  ): Promise<CollectReturn> {
    const collect = await this.prisma.collect.findUnique({ where: { id } });
    if (!collect) throw new BadRequestException('Collect not found');

    const updated = await this.prisma.collect.update({
      where: { id },
      data: { status: dto.status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        ecoPoint: {
          select: {
            id: true,
            name: true,
          },
        },
        materialsCollected: {
          include: { material: { select: { id: true, name: true } } },
        },
      },
    });

    return this.mapCollectReturn(updated);
  }

  async cancel(id: number, dto: CollectStatusType): Promise<string> {
    const collect = await this.prisma.collect.findUnique({ where: { id } });
    if (!collect) throw new BadRequestException('Collect not found');

    await this.prisma.collect.update({
      where: { id },
      data: { status: dto },
    });
    return 'Collect canceled successfully';
  }
}
