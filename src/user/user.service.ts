import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({});
    return users;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async removeUser(id: number) {
    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });
    return deletedUser;
  }
}
