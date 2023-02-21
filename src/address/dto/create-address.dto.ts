import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  streetName: string;

  @IsNotEmpty()
  buildingNumber: string;

  @IsNotEmpty()
  floor: string;

  @IsNotEmpty()
  apartment: string;
}
