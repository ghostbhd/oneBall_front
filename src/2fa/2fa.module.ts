import { Module } from '@nestjs/common';
import { TfaService } from './2fa.service';
import { TfaController } from './2fa.controller';

@Module({
  controllers: [TfaController],
  providers: [TfaService],
})
export class TfaModule {}
