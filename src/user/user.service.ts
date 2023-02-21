import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/schema';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModal: Model<userDocument>,
    private addressService: AddressService,
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<userDocument> {
    const existingUser = new this.userModal(CreateUserDto);
    return existingUser.save();
  }

  async update(
    id: string,
    UpdateUserDto: UpdateUserDto,
  ): Promise<userDocument> {
    const existingUser = this.userModal.findByIdAndUpdate(id, UpdateUserDto, {
      new: true,
    });

    if (!existingUser) throw new NotFoundException(`Usecr #${id} Not Found`);
    return existingUser;
  }

  async delete(id): Promise<User> {
    const existingUser = await this.userModal.findOneAndDelete({ _id: id });

    if (!existingUser) throw new NotFoundException(`User #${id} Not Found`);
    this.addressService.deleteAddressesRelatedToUser(id);
    return existingUser;
  }

  async findByEmail(email: string): Promise<userDocument> {
    const existingUser = await this.userModal.findOne({ email }).exec();

    if (!existingUser) throw new NotFoundException(`Usecr #${email} Not Found`);

    return existingUser;
  }
}
