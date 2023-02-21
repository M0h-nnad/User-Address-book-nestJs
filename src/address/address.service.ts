import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { address, addressDocument } from 'src/schema';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(address.name) private addressModel: Model<addressDocument>,
  ) {}

  async create(
    createAddressDto: CreateAddressDto,
    userId: string,
  ): Promise<addressDocument> {
    const existingAddress = new this.addressModel({
      ...createAddressDto,
      userId,
    });
    return existingAddress.save();
  }

  async update(
    id: string,
    userId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<addressDocument> {
    const existingAddress = await this.addressModel.findOneAndUpdate(
      { _id: id, userId },
      updateAddressDto,
      {
        new: true,
      },
    );

    if (!existingAddress)
      throw new NotFoundException(`Address #${id} Not Found in your Account `);
    return existingAddress;
  }

  async getUserAddresses(userId: string): Promise<addressDocument[]> {
    const existingAddresses = await this.addressModel.find({ userId });

    return existingAddresses;
  }

  async get(id: string, userId: string): Promise<addressDocument> {
    const existingAddress = await this.addressModel.findOne({
      _id: id,
      userId,
    });

    if (!existingAddress)
      throw new NotFoundException(`Address #${id} Not Found in your Account`);

    return existingAddress;
  }

  async delete(id: string, userId: string): Promise<addressDocument> {
    const existingAddress = await this.addressModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!existingAddress)
      throw new NotFoundException(`Address #${id} Not Found in your Account`);

    return existingAddress;
  }

  async deleteAddressesRelatedToUser(userId: string) {
    const existingAddresses = await this.addressModel.deleteMany({ userId });

    return existingAddresses;
  }
}
