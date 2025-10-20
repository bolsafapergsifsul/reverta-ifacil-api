import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from '@prisma/client';
import { UserDTORequest } from './dto/userDTO';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDTORequest[] | null> {
    const users = await this.userService.findAll();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      phone: user.phone,
      document: user.document,
      zipCode: user.zipCode,
      street: user.street,
      numberAddress: user.numberAddress,
      complement: user.complement,
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDTORequest | null> {
    const user = await this.userService.findById(+id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      phone: user.phone,
      document: user.document,
      zipCode: user.zipCode,
      street: user.street,
      numberAddress: user.numberAddress,
      complement: user.complement,
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Get('email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<UserDTORequest | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      phone: user.phone,
      document: user.document,
      zipCode: user.zipCode,
      street: user.street,
      numberAddress: user.numberAddress,
      complement: user.complement,
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() user: Partial<User>) {
    try {
      return await this.userService.updateUser(+id, user);
    } catch (error) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message || 'Erro ao atualizar usuário',
      );
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.removeUser(+id);
  }
}
