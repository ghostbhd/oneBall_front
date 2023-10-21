import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from 'src/DTOS/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('signup')
    signup(@Body() body: AuthDto) {
        return this.authService.signup(body.username, body.email, body.pass)
    }
    @Post('signin')
    signin(@Body() body: AuthDto){
         return this.authService.signin(body.username, body.pass)
    }
}
