import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[] | null> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findById(+id);
  }

  @Get('email')
  async getUserByEmail(@Param('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
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
