import { Controller, Get, Post, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto.name, createUserDto.email, createUserDto.avatar);
  }
  // @UseGuards(AuthGuard('jwt'))
  // @Get(':id')
  // async findUserById(@Param('id') id: string): Promise<User | undefined> {
  //     console.log(id);
  //      return this.userService.findUserById(+id);
  //   }
  @Get('delete')
  deleteUser(): Promise<void> {
    return this.userService.deleteUser();
  }   
    @Get()
    // @UseGuards(AuthGuard('jwt'))
    async findAllUsers(@Req() req: any): Promise<User[]> {
    // console.log("here is the payload =====> " + JSON.stringify(req.user));
    const user = this.userService.findAllUsers();
    console.log("0000000000000------------------000000000000")
    return user; 
  }
  @Post('friend')
  async userFriend (@Body() body: any) {
    try
  {

    console.log("the frind is " , body.friend)
     await this.userService.friends(body.friend);
    }
    catch (error) {
      return null;
    }
  }
}
