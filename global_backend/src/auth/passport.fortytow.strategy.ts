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
      clientID: 'u-s4t2ud-b0ed96cd075b1351a54095578eb440c9da4d5dfee6cf8a7cf6969c1cc80b825c',
      clientSecret: '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',
      callbackURL: 'http://localhost:3009/auth/FortyTwo/callback', // Adjust the callback URL
      scope: ['public'], 
    });
    console.log("the constructor of passport is called");
  }

  async validate(accessToken: string, refreshToken: string, profile: any) : Promise<any> {
    // console.log(accessToken);
    // console.log(refreshToken);
    console.log("profile here");
    // console.log(profile);
    const user = await this.AuthService.login({email: profile.emails[0].value, username: profile.emails[0].value.split("@")[0] + "_42", avatar: profile._json.image.link});
    // if (!user) return null;
    console.log(user);
    console.log("profile here");
    return {user, profile, accessToken , refreshToken};
  }
}