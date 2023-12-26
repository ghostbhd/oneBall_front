import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { profile } from 'console';
import { Dataprofile } from 'src/data/data';
import { CreateFriendDto } from 'src/friend/dto/create-friend.dto';

@Controller('profileData')
export class ProfiledataController {
  constructor (private readonly profiledata: Dataprofile)
{}
  @Post('user')
  @UseGuards(AuthGuard('jwt'))
  async UserProfile(@Body() Body: {username: string} , @Req() req: any) {

      var user = await this.profiledata.getUserprofile(req.user.username, Body.username)
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async profile (@Req() req: any) {
   console.log(__dirname);
   console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiirrrrrrrrrrr" + req.user.username) 
    console.log("this resource is protected");
    var profile  = await this.profiledata.getInfoprofile(req.user.username);
    // profile.profileInfo.
    return (profile);
 }
}
