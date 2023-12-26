import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TfaService } from './2fa.service';
import { Create2faDto } from './dto/create-2fa.dto';
import * as speakeasy from "speakeasy";
import * as QRCode from 'qrcode'
@Controller('2fa')
export class TfaController {
  constructor(private readonly tfaService: TfaService) {}

  @Post()
  create(@Body() create2faDto: Create2faDto) {
    const secret = speakeasy.generateSecret();
    QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
      console.log(data_url);
 console.log('<img src="' + data_url + '">');
  });
    return this.tfaService.create(create2faDto);
  }
}
