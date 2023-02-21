import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { address, addressSchema } from 'src/schema';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: address.name,
        schema: addressSchema,
      },
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
