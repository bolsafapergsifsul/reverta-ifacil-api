import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsOptional()
  profilePic?: string;
  @IsString()
  phone: string;
  @IsString()
  document: string;
  @IsString()
  zipCode: string;
  @IsString()
  street: string;
  @IsString()
  numberAddress: string;
  @IsString()
  complement?: string;
  @IsString()
  neighborhood: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
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
