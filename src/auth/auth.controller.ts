import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  isEmailAvailableDTO,
  RefreshTokenDTO,
  SignInDTO,
  SignOutDTO,
  SignUpDTO,
} from './dtos/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpData: SignUpDTO) {
    return await this.authService.signUp(signUpData);
  }

  @Post('signin')
  async signIn(@Body() signInData: SignInDTO) {
    return await this.authService.signIn(signInData);
  }

  @UseGuards(AuthGuard)
  @Post('signout')
  async signOut(@Request() req) {
    const userPaylod = req.user as { sub: number };
    const userId = userPaylod.sub;

    return await this.authService.singOut(userId);
  }

  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenDTO) {
    return await this.authService.refreshToken(data.refreshToken);
  }

  @Get('email-available')
  async isEmailAvailable(@Body() data: isEmailAvailableDTO) {
    return await this.authService.isEmailAvailable(data.email);
  }
}
