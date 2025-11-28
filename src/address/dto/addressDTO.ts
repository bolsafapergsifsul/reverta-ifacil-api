import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  numberAddress: string;
}
