import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { profile } from "console";
import { Dataprofile } from "src/data/data";
import { ProfileUserDto } from "src/dtos/ProfileUser.dto";
import { CreateFriendDto } from "src/friend/dto/create-friend.dto";

@Controller("profileData")
export class ProfiledataController {
  constructor(private readonly profiledata: Dataprofile) {}
  @Post("user")
  @UseGuards(AuthGuard("jwt"))
  async UserProfile(@Body() Body: ProfileUserDto, @Req() req: any) {
    if (req.user.username === Body.username)
  {
    console.log("the usernames ", req.user.username, " ", Body.username)
      throw new HttpException("redirect to user profile", 301);
    }
    var user = await this.profiledata.getUserprofile(
      req.user.username,
      Body.username
    );
    return user;
  }
  @Get()
  @UseGuards(AuthGuard("jwt"))
  async profile(@Req() req: any) {
    console.log(__dirname);
    console.log(
      "siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiirrrrrrrrrrr" + req.user.username
    );
    console.log("this resource is protected");
    var profile = await this.profiledata.getInfoprofile(req.user.username);
    // profile.profileInfo.
    return profile;
  }
}
