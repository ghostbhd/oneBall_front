import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject('AUTH_SERVICE') private readonly AuthService: AuthService) {
    super({
      clientID: process.env.G_CLIENTID,
      clientSecret: process.env.G_CLIENTID_SECRET,
      callbackURL: process.env.G_CALLBACK, // Adjust the callback URL
      scope: ['profile', 'email'], 
    });
    // console.log("the constructor of passport is called");
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
    const user = await this.AuthService.login({email: profile.emails[0].value, username: profile.emails[0].value.split("@")[0] + "_g", avatar: profile._json.picture});
    // if (!user) return null;
    console.log(user);
    // console.log("profile here");
    return { user , profile, accessToken , refreshToken};
  }
}

