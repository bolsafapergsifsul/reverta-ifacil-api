import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaterialDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateMaterialDTO {
  @IsString()
  name: string;
}
