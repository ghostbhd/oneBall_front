import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express'
import * as cors from 'cors';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    // @Post('signup')
    // signup(@Body() body: AuthDto) {
    //     return this.authService.signup(body.username, body.email, body.pass)
    // }
    // @Post('signin')
    // signin(@Body() body: AuthDto){
    //      return this.authService.signin(body.username, body.pass)
    // }
    @Get('login/google')
    @UseGuards(AuthGuard('google'))
    loging() {
    console.log("I m here mother f.....");
        return ({msg: "the authentication is done well ;)"});
  }
      @Get('google/callback')
      @UseGuards(AuthGuard('google'))
      async googleLoginCallback(@Req() req: any , @Res({ passthrough: true }) res: Response ) {
    // console.log("here is user informations :" + JSON.stringify(req.user.profile, null, 2));
    console.log("profile here ===========" +( req));
    const accessToken:  string = await this.authService.create_jwt({
        email: req.user.profile.emails[0].value,
        username: req.user.profile.emails[0].value.split("@")[0] + "_g",
        avatar: req.user.profile.photos[0].value
      });
    res.cookie('accessToken', accessToken);
    // const accessTokenCookie = `accessToken=${accessToken}; HttpOnly; domain=.localhost; Max-Age=${6000 * 60}; SameSite=Strict`;
    // res.setHeader('Set-Cookie',`accessToken=${ accessToken}`);
      // res.setHeader('Set-Cookie', accessTokenCookie);
      res.redirect("http://localhost:5173/CallBack");
      return( 
        {fff: 'ddddd'} 
    );
  }






   @Get('login/FortyTwo')
    @UseGuards(AuthGuard('FortyTwo'))
    loginng() {
    console.log("I m here mother f.....");
        return ({msg: "the authentication is done well ;)"});
  }
      @Get('FortyTwo/callback')
      @UseGuards(AuthGuard('FortyTwo'))
      async FortyTwoLoginCallback(@Req() req: any , @Res() res: Response ) {
    // console.log("here is user informations :" + JSON.stringify(req.user));
    console.log("profile here ===========");
    // const accessToken:  string = await this.authService.create_jwt({
    //     email: req.user.profile.emails[0].value,
    //     username: req.user.profile.emails[0].value.split("@")[1] + "_g",
    //     avatar: req.user.photos[0].value
    //   });
    //   return( 
    //     res.header('authorization', `Bearer ${accessToken}`).json({ access_token: accessToken})
    // );
    const accessToken:  string = await this.authService.create_jwt({
        email: req.user.profile.emails[0].value,
        username: req.user.profile.emails[0].value.split("@")[0] + "_42",
        avatar: req.user.profile.photos[0].value
      });
    res.cookie('accessToken', accessToken);
    // const accessTokenCookie = `accessToken=${accessToken}; HttpOnly; domain=.localhost; Max-Age=${6000 * 60}; SameSite=Strict`;
    // res.setHeader('Set-Cookie',`accessToken=${ accessToken}`);
      // res.setHeader('Set-Cookie', accessTokenCookie);
      res.redirect("http://localhost:5173/CallBack");
      return( 
        {fff: 'ddddd'} 
    );
  }




}
