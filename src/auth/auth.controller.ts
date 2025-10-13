import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './dtos/auth';
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
}
