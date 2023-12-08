import { Module } from '@nestjs/common';
import { DatadaShboard, Dataprofile } from './data';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [Dataprofile, DatadaShboard],
  exports: [Dataprofile, DatadaShboard],
})
export class DataModule {}
