import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Payload } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
@UseGuards(JwtGuard)
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('')
  getUserAddresses(@Payload() payload: { id: string; email: string }) {
    return this.addressService.getUserAddresses(payload.id);
  }

  @Get(':id')
  getAddress(@Param('id') id: string, payload: { id: string; email: string }) {
    return this.addressService.get(id, payload.id);
  }

  @Post()
  createAddress(
    @Payload() payload: { id: string; email: string },
    @Body() createAddresssDto: CreateAddressDto,
  ) {
    return this.addressService.create(createAddresssDto, payload.id);
  }

  @Put(':id')
  updateAddress(
    @Param('id') id: string,
    @Payload() payload: { id: string; email: string },
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, payload.id, updateAddressDto);
  }

  @Delete(':id')
  deleteAddress(
    @Param('id') id: string,
    @Payload() payload: { id: string; email: string },
  ) {
    this.addressService.delete(id, payload.id);
  }
}
