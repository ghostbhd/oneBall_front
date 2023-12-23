import { Module } from '@nestjs/common';
import { AddfriendService } from './addfriend.service';
import { AddfriendGateway } from './addfriend.gateway';
import { Friendship } from 'src/entities/Friendship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Friendship, User])],
  providers: [AddfriendGateway, AddfriendService, UserService],
})
export class AddfriendModule {}
