import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { MongoServerError } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signup(CreateUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userService.create(CreateUserDto);

      const token = this.jwtService.sign({
        id: existingUser._id,
        email: existingUser.email,
      });

      return { token };
    } catch (e) {
      if (e instanceof MongoServerError) {
        if (e.code === 11000) {
          throw new BadRequestException('User Already ');
        }
      }
    }
  }

  async login(authDto: AuthDto) {
    const existingUser = await this.userService.findByEmail(authDto.email);

    if (!existingUser) throw new NotFoundException('Invalid Credientals');

    const isMatch = await argon.verify(existingUser.password, authDto.password);

    if (!isMatch) throw new BadRequestException('Invalid Credientals');

    const token = await this.jwtService.sign({
      id: existingUser._id,
      email: existingUser.email,
    });

    return { token };
  }
}
