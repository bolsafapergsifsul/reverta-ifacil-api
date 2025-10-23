import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async sendResetCode(email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetCode = v4().slice(0, 4);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetCode },
    });

    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Recuperação de Senha',
      text: `Seu código de recuperação de senha é: ${resetCode}`,
    });

    return 'Código de redefinição enviado com sucesso';
  }

  async validateResetCode(email: string, resetCode: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (user.resetCode !== resetCode) {
      throw new BadRequestException('Código de redefinição inválido');
    }
    return true;
  }

  async resetPassword(email: string, newPassword: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetCode: null },
    });

    return 'Senha redefinida com sucesso!';
  }
}
