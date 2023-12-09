import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Dataprofile } from 'src/data/data';

@Controller('profileData')
export class ProfiledataController {
  constructor (private readonly profiledata: Dataprofile)
{}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async profile (@Req() req: any) {
   console.log(__dirname);
   console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiirrrrrrrrrrr" + req.user.username) 
    console.log("this resource is protected");
    return (await this.profiledata.getInfoprofile(req.user.username));
 }
}
