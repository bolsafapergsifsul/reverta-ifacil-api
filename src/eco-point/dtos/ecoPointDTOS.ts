import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EcoPointDTO {
  @IsNotEmpty()
  name: string;
  @IsString()
  zipCode: string;
  @IsString()
  street: string;
  @IsString()
  numberAddress: string;
  @IsString()
  complement?: string | null;
  @IsString()
  neighborhood: string;
  @IsString()
  city: string;
  @IsString()
  state: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
  @IsString()
  serviceHours: string;
  @IsString()
  phone: string;
  @IsString()
  collectionsInfo: string;
  @IsString()
  typeMaterials: string;
}
