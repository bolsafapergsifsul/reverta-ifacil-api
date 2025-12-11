import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserType, UserFormatedType } from './userTypes';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserFormatedType[] | null> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserFormatedType | null> {
    const user = await this.userService.findById(+id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Get('email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<UserFormatedType | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  // @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<UpdateUserType>,
  ) {
    try {
      return await this.userService.updateUser(Number(id), user);
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
