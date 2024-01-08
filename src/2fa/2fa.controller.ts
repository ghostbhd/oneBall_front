import { Controller, Get, Post, Body, UseGuards, Req, Res } from "@nestjs/common";
import { TfaService } from "./2fa.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";

@Controller("2fa")
export class TfaController 
{
    constructor(private readonly tfaService: TfaService,
                private readonly authService: AuthService
  ) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async create(@Req() req: any) {
      return this.tfaService.create(req.user.username);
    }

    @Post()
    // @UseGuards(AuthGuard("jwt"))
    async validate(@Body() body: any, @Res() res: any) {
      const username = body.username
      const pass = body.pass
      console.log("Request Body:", pass);
      console.log("the pass of 2fa ======> ", pass);
      console.log("the user name of 2fa ======> ", username);
      const user = await this.tfaService.validate(username, pass);
      const accessToken:  string = await this.authService.create_jwt({
        email: user.email,
        username: user.username,
        avatar: user.Avatar
      });
      console.log("waaaaaaaaa", accessToken) 
      //  await this.tfaService.validate(username, pass)
      res.status(201).send({accessToken: accessToken})
      return ( {accessToken: accessToken});
    }

    @Get("disable")
    @UseGuards(AuthGuard("jwt"))
    async disable(@Req() req: any) {
      return this.tfaService.disable(req.user.username);
    }

    @Get('status')
    @UseGuards(AuthGuard('jwt'))
    async get2FAStatus(@Req() req: any) {
      return this.tfaService.get2FAStatus(req.user.username);
    }

}
