import { Module } from '@nestjs/common';
import { DatadaShboard, Dataprofile } from './data';
import { UserModule } from 'src/user/user.module';
import { FriendModule } from 'src/friend/friend.module';

@Module({
  imports: [UserModule, FriendModule],
  providers: [Dataprofile, DatadaShboard],
  exports: [Dataprofile, DatadaShboard],
})
export class DataModule {}
