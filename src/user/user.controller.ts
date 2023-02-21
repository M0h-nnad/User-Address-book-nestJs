import { Body, Controller, Delete, Put, UseGuards } from '@nestjs/common';
import { Payload } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Put('')
  @UseGuards(JwtGuard)
  updateUser(
    @Payload() payload: { id: string; email: string },
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    const user = this.userService.update(payload.id, UpdateUserDto);

    return user;
  }

  @Delete('')
  @UseGuards(JwtGuard)
  deleteUser(@Payload() payload: { id: string; email: string }) {
    const user = this.userService.delete(payload.id);

    return user;
  }
}
