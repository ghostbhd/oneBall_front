import { Module } from '@nestjs/common';
import { TfaService } from './2fa.service';
import { TfaController } from './2fa.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ UserModule, AuthModule],
  controllers: [TfaController ],
  providers: [TfaService],
})
export class TfaModule {}
