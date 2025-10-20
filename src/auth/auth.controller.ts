import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  isEmailAvailableDTO,
  RefreshTokenDTO,
  SignInDTO,
  SignOutDTO,
  SignUpDTO,
} from './dtos/auth';
import { AuthService } from './auth.service';

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

  @Post('signout')
  async signOut(@Body() data: SignOutDTO) {
    return await this.authService.singOut(data.userId);
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
