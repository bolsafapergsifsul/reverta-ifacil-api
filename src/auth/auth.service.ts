import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDTO, SignUpDTO } from './dtos/auth';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private addressService: AddressService,
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

    const address = await this.addressService.getCompleteAddress(
      data.zipCode,
      data.numberAddress,
    );

    await this.prismaService.user.create({
      data: {
        ...data,
        ...address,
        password: hashedPassword,
      },
    });

    return 'usuário criado com sucesso';
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
        sub: user.id,
      },
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },

      {
        expiresIn: '7d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      },
    );

    const hashedRefreshToken = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
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
        latitude: user.latitude,
        longitude: user.longitude,
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

  async refreshToken(token: string) {
    if (!token) {
      throw new UnauthorizedException('Token de atualização ausente');
    }

    let payload;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException(
        'Token de atualização inválido ou exprirado',
      );
    }

    const user = await this.prismaService.user.findUnique({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      where: { id: payload.sub },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException(
        'Usuário não encontrado ou sem token de atualização',
      );
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const tokensMatch = hashedToken === user.refreshToken;

    if (!tokensMatch) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          refreshToken: null,
        },
      });
      throw new UnauthorizedException('Token de atualização roubado.');
    }
    const newAccessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        expiresIn: '15m',
      },
    );

    const newRefreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
      },
      {
        expiresIn: '7d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      },
    );

    const newHashedRefreshToken = crypto
      .createHash('sha256')
      .update(newRefreshToken)
      .digest('hex');

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        refreshToken: newHashedRefreshToken,
      },
    });
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
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
        latitude: user.latitude,
        longitude: user.longitude,
      },
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
      return {
        message: 'Email não disponível',
        isAvailable: false,
      };
    } else {
      return {
        message: 'Email disponível',
        isAvailable: true,
      };
    }
  }
}
