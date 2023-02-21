import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { MongoServerError } from 'mongodb';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModal: Model<userDocument>,
    private addressService: AddressService,
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = new this.userModal(CreateUserDto);
      return existingUser.save();
    } catch (e) {
      if (e instanceof MongoServerError) {
        if (e.code === 11000) {
          throw new BadRequestException('User Already ');
        }
      }
    }
  }

  async update(id: string, UpdateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = this.userModal.findByIdAndUpdate(id, UpdateUserDto, {
      new: true,
    });

    if (!existingUser) throw new NotFoundException(`User #${id} Not Found`);
    return existingUser;
  }

  async delete(id): Promise<User> {
    const existingUser = await this.userModal.findByIdAndDelete(id);

    if (!existingUser) throw new NotFoundException(`User #${id} Not Found`);
    this.addressService.deleteAddressesRelatedToUser(id);

    return existingUser;
  }
}
