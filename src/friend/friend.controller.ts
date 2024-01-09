import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';

@Controller('friend')
export class FriendController {
  constructor(
    private readonly friendService: FriendService
  ) {}

  @Post()
  create(@Body() createFriendDto: CreateFriendDto) {
    return this.friendService.create(createFriendDto);
  }

  @Post('users')
  async findAll(@Body() createFriendDto: CreateFriendDto) {
        return await this.friendService.findAll(createFriendDto.currentUser);
  }

//   @Get(':id')
//   findOne(username: string) {
//     return this.friendService.findOne(username);
//   }

//   @Delete()
//   remove() {
//     return this.friendService.remove();
//   }
}
