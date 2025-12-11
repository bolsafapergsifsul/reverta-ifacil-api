import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserType, UserFormatedType } from './userTypes';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<UserFormatedType[]> {
    const users = await this.prismaService.user.findMany({});
    const usersFormated = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        phoneNumber: user.phoneNumber,
        document: user.document,
        zipCode: user.zipCode,
        street: user.street,
        numberAddress: user.numberAddress,
        neighborhood: user.neighborhood,
        city: user.city,
        state: user.state,
        complement: user.complement,
        latitude: Number(user.latitude),
        longitude: Number(user.longitude),
      };
    });
    return usersFormated;
  }

  async findById(id: number): Promise<UserFormatedType | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      phoneNumber: user.phoneNumber,
      document: user.document,
      zipCode: user.zipCode,
      street: user.street,
      numberAddress: user.numberAddress,
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
      complement: user.complement,
      latitude: Number(user.latitude),
      longitude: Number(user.longitude),
    };
  }

  async findByEmail(email: string): Promise<UserFormatedType | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      phoneNumber: user.phoneNumber,
      document: user.document,
      zipCode: user.zipCode,
      street: user.street,
      numberAddress: user.numberAddress,
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
      complement: user.complement,
      latitude: Number(user.latitude),
      longitude: Number(user.longitude),
    };
  }

  async updateUser(
    id: number,
    data: Partial<UpdateUserType>,
  ): Promise<UserFormatedType> {
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
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      phoneNumber: updatedUser.phoneNumber,
      document: updatedUser.document,
      zipCode: updatedUser.zipCode,
      street: updatedUser.street,
      numberAddress: updatedUser.numberAddress,
      neighborhood: updatedUser.neighborhood,
      city: updatedUser.city,
      state: updatedUser.state,
      complement: updatedUser.complement,
      latitude: Number(updatedUser.latitude),
      longitude: Number(updatedUser.longitude),
    };
  }

  async removeUser(id: number) {
    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });
    return {
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email,
      profilePic: deletedUser.profilePic,
      phoneNumber: deletedUser.phoneNumber,
      document: deletedUser.document,
      zipCode: deletedUser.zipCode,
      street: deletedUser.street,
      numberAddress: deletedUser.numberAddress,
      neighborhood: deletedUser.neighborhood,
      city: deletedUser.city,
      state: deletedUser.state,
      complement: deletedUser.complement,
      latitude: Number(deletedUser.latitude),
      longitude: Number(deletedUser.longitude),
    };
  }
}
