import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../DTOS/create-user.dto';
import { UpdateUserDto } from '../DTOS/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto.name, createUserDto.email, createUserDto.pass);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User | undefined> {
      console.log(id);
      return this.userService.findUserById(+id);
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
}