import { Module } from '@nestjs/common';
import { TfaService } from './2fa.service';
import { TfaController } from './2fa.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ UserModule],
  controllers: [TfaController ],
  providers: [TfaService],
})
export class TfaModule {}
