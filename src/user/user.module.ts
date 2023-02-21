import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from 'src/address/address.module';
import { User, userSchema } from 'src/schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    AddressModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
