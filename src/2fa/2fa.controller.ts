import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TfaService } from './2fa.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('2fa')
export class TfaController {
  constructor(private readonly tfaService: TfaService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: any) {
    return this.tfaService.create(req.user.username);
  } 

  @Post()
  @UseGuards(AuthGuard('jwt'))
   async Validate(@Body() body: any, @Req() req: any) {

    console.log("the pass of 2fa ======> ", body.pass)
    console.log("the user name of 2fa ======> ", req.user.username)
    return this.tfaService.validate( req.user.username ,body.pass);
  }

  @Get('disable')
  @UseGuards(AuthGuard('jwt'))
  async disable(@Req() req: any) {
    
    return this.tfaService.disable(req.user.username);
  }
}
