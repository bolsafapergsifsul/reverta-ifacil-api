import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateCollectMaterialDto {
  @IsNumber()
  id: number; // material id
}

export class CreateCollectDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  ecoPointId: number;

  @IsDateString()
  scheduledAt: string; // ISO string

  @IsOptional()
  @IsString()
  estimatedWeight?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCollectMaterialDto)
  materials: CreateCollectMaterialDto[];
}

export enum CollectStatusDto {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export class UpdateCollectStatusDto {
  @IsEnum(CollectStatusDto)
  status: CollectStatusDto;
}
