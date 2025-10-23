import { Body, Controller, Post } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import {
  codeVerificationDTO,
  forgotPasswordDTO,
  resetCodeDTO,
} from './dtos/forgotPasswordDTO';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @Post('code')
  sendResetCode(@Body() data: codeVerificationDTO) {
    return this.forgotPasswordService.sendResetCode(data.email);
  }

  @Post('validate-code')
  validateResetCode(@Body() data: resetCodeDTO) {
    return this.forgotPasswordService.validateResetCode(
      data.email,
      data.resetCode,
    );
  }

  @Post('reset')
  resetPassword(@Body() data: forgotPasswordDTO) {
    return this.forgotPasswordService.resetPassword(
      data.email,
      data.newPassword,
    );
  }
}
