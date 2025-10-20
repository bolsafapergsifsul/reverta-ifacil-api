import { Body, Controller, Post } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import {
  codeVerificationDTO,
  forgotPasswordDTO,
} from './dtos/forgotPasswordDTO';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @Post('code')
  sendResetCode(@Body() data: codeVerificationDTO) {
    return this.forgotPasswordService.sendResetCode(data.email);
  }

  @Post('reset')
  resetPassword(@Body() data: forgotPasswordDTO) {
    return this.forgotPasswordService.resetPassword(
      data.email,
      data.resetCode,
      data.newPassword,
    );
  }
}
