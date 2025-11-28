import { Decimal } from '@prisma/client/runtime/library';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
  phoneNumber: string;
  @IsString()
  document: string;
  @IsString()
  zipCode: string | null;
  @IsString()
  street: string | null;
  @IsString()
  numberAddress: string | null;
  @IsString()
  neighborhood: string | null;
  @IsString()
  city: string | null;
  @IsString()
  state: string | null;
  @IsString()
  complement: string | null;
  @IsNumber()
  @IsOptional()
  latitude: Decimal | null;
  @IsNumber()
  @IsOptional()
  longitude: Decimal | null;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
