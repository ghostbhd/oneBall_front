import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './passport-config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { FortyTwoStrategy } from './passport.fortytow.strategy';

@Module({
    imports: [UserModule, JwtModule.register({
      secret: "secre of mine", //sould add it the env
      signOptions: { expiresIn: '600000s' },
  })],
    controllers: [AuthController],
    providers: [GoogleStrategy,
                  {provide: 'AUTH_SERVICE',
                    useClass: AuthService}, AuthService, JwtStrategy, FortyTwoStrategy, ],
  exports: [AuthService],
})
export class AuthModule {}
