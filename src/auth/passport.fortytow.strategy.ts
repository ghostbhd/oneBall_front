import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { Strategy } from 'passport-42'
const Strategy = require('passport-42').Strategy;
// import  { Strategy, Profile}  from 'passport-42'
// import { Strategy } from 'passport-42';
@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'FortyTwo') {
  constructor(@Inject('AUTH_SERVICE') private readonly AuthService: AuthService) {
    super({
      clientID: process.env.F_CLIENTID,
      clientSecret: process.env.F_CLIENTID_SECRET,
      callbackURL: process.env.F_CALLBACK, // Adjust the callback URL
      scope: ['public'], 
    });
    // console.log("the constructor of passport is called");
  }

  async validate(accessToken: string, refreshToken: string, profile: any) : Promise<any> {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log("profile here");
    // console.log(profile);
    const user = await this.AuthService.login({email: profile.emails[0].value, username: profile.emails[0].value.split("@")[0] + "_42", avatar: profile._json.image.link});
    // if (!user) return null;
    // console.log(user);
    // console.log("profile here");
    return {user, profile, accessToken , refreshToken};
  }
}
