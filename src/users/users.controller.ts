import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found!');
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): void {
    this.userService.update(parseInt(id), body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    this.userService.remove(parseInt(id));
  }
}
