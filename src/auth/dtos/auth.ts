import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  document: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  cep: string;
  @IsNotEmpty()
  numberAddress: string;
  @IsString()
  complement?: string;
}

export class SignInDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
