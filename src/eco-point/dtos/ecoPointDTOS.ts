import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class EcoPointDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  serviceHours: string | null;

  @IsOptional()
  @IsString()
  phoneNumber: string | null;

  @IsOptional()
  @IsString()
  infos: string | null;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsArray()
  @IsString({ each: true })
  materialsId: string[];

  @IsString()
  @Length(8, 8)
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  numberAddress: string;
}
