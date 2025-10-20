import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserDTORequest {
  @IsNumber()
  id: number;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  profilePic: string | null;
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
  complement: string | null;
  @IsString()
  neighborhood: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
