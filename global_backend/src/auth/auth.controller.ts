import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userReposite: Repository<User>
    ){}


    @Get('login/google')
    @UseGuards(AuthGuard('google'))
    loging() {
        return ({msg: "the authentication is done well ;)"});
  }


      @Get('google/callback')
      @UseGuards(AuthGuard('google'))
      async googleLoginCallback(@Req() req: any , @Res({ passthrough: true }) res: Response ) {
    // console.log("here is user informations :" + JSON.stringify(req.user.profile, null, 2));
    console.log("profile here ===========" +( req));
    // const accessToken:  string = await this.authService.create_jwt({
    //     email: req.user.profile.emails[0].value,
    //     username: req.user.profile.emails[0].value.split("@")[0] + "_g",
    //     avatar: req.user.profile.photos[0].value
    //   });

    const user = await this.userReposite.findOne({where: {username: req.user.user.username}})
    const accessToken:  string = await this.authService.create_jwt({
        email: user.email,
        username: user.username,
        avatar: user.Avatar
      });
    res.cookie('accessToken', accessToken);
    // const accessTokenCookie = `accessToken=${accessToken}; HttpOnly; domain=.localhost; Max-Age=${6000 * 60}; SameSite=Strict`;
      // res.setHeader('Set-Cookie', accessTokenCookie);
      res.redirect("http://localhost:5173/CallBack");
    // console.log("the user throw an Exception ")
  }


    @Get('login/FortyTwo')
    @UseGuards(AuthGuard('FortyTwo'))
    loginng() {
        return ({msg: "the authentication is done well ;)"});
  }
      @Get('FortyTwo/callback')
      @UseGuards(AuthGuard('FortyTwo'))
      async FortyTwoLoginCallback(@Req() req: any , @Res() res: Response ) {
    console.log("profile here ===========");
    
    const user = await this.userReposite.findOne({where: {username: req.user.user.username}})
    const accessToken:  string = await this.authService.create_jwt({
        email: user.email,
        username: user.username,
        avatar: user.Avatar
      });
      res.cookie('accessToken', accessToken);
      res.redirect("http://localhost:5173/CallBack");
  }
}
