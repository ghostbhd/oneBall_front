import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject('AUTH_SERVICE') private readonly AuthService: AuthService) {
    super({
      clientID: '1087847398531-ka4fe7pu9jdopal6is01j81tnpstnqv3.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3009/auth/google/callback', // Adjust the callback URL
      scope: ['profile', 'email'], 
    });
    console.log("the constructor of passport is called");
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // console.log(accessToken);
    // console.log(refreshToken);
    console.log(profile);
    const user = await this.AuthService.login({email: profile.emails[0].value, username: profile.emails[0].value.split("@")[0] + "_g", avatar: profile._json.picture});
    // if (!user) return null;
    console.log(user);
    console.log("profile here");
    return { user , profile, accessToken , refreshToken};
  }
}

