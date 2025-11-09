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
  phone: string;
  @IsString()
  document: string;
  @IsString()
  zipCode: string;
  @IsString()
  numberAddress: string;
  @IsNumber()
  @IsOptional()
  latitude: number | null;
  @IsNumber()
  @IsOptional()
  longitude: number | null;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
