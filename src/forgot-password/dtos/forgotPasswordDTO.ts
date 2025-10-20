import { IsEmail, IsString } from 'class-validator';

export class codeVerificationDTO {
  @IsEmail()
  email: string;
}

export class forgotPasswordDTO {
  @IsEmail()
  email: string;
  @IsString()
  resetCode: string;
  @IsString()
  newPassword: string;
}
