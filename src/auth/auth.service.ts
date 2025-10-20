import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signUp(data: SignUpDTO) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...data,

        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
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
    };
  }

  async signIn(data: SignInDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMath = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMath) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        document: user.document,
      },
      { expiresIn: '15m' },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
      },
      { expiresIn: '7d' },
    );

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
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
      },
    };
  }

  async singOut(userId: number) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
      },
    });

    return 'Logout realizado com sucesso';
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const user = await this.prismaService.user.findFirst({
      where: { refreshToken },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        document: user.document,
      },
      { expiresIn: '15m' },
    );

    return {
      accessToken,
    };
  }

  async isEmailAvailable(email: string) {
    if (!email) {
      throw new UnauthorizedException('Email is missing');
    }

    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return 'Esse email já está em uso';
    } else {
      return 'Esse email está disponível';
    }
  }
}
