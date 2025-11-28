import { Controller, Get, Query } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async getAddress(
    @Query('zipcode') zipcode: string,
    @Query('numberAddress') numberAddress: string,
  ) {
    return this.addressService.getCompleteAddress(zipcode, numberAddress);
  }
}
