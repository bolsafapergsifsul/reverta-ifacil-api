import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsString()
  @Length(8, 8)
  zipCode: string;

  @IsString()
  numberAddress: string;
}

export class SignInDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class SignOutDTO {
  @IsNotEmpty()
  userId: number;
}

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class isEmailAvailableDTO {
  @IsEmail()
  email: string;
}
