import { Module } from '@nestjs/common';
import { AddfriendService } from './addfriend.service';
import { AddfriendGateway } from './addfriend.gateway';
import { Friendship } from 'src/entities/Friendship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { FriendModule } from 'src/friend/friend.module';
import { BlockedList } from 'src/entities/BlockedList.entity';
import { Notif } from 'src/entities/Notification.entity';
import { JwtModule } from '@nestjs/jwt';
import { GameStats } from 'src/entities/game.entity';

@Module({
  imports: [JwtModule ,FriendModule, TypeOrmModule.forFeature([Friendship, User, BlockedList, Notif, GameStats])],
  providers: [AddfriendGateway, AddfriendService, UserService],
})
export class AddfriendModule {}
