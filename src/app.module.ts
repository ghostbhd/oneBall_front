import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { User } from './entities/user.entity';
import { Channel } from './entities/Channel.entity';
import { Channel_Membership } from './entities/Channel_Membership.entity';
import { Chat } from './entities/Chat.entity';
import { Message } from './entities/Message.entity';
import { Channel_Message } from './entities/Channel_Message.entity';
import { Friendship } from './entities/Friendship.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfiledataModule } from './profiledata/profiledata.module';
import { UploadModule } from './upload/upload.module';
import { DataModule } from './data/data.module';
import { StatusModule } from './status/status.module';
import { AddfriendModule } from './addfriend/addfriend.module';
import { TfaModule } from './2fa/2fa.module';
import { FriendModule } from './friend/friend.module';
import { ChatModule } from './chat/chat.module';
import { ChannelModule } from './chat/channel/channel.module';
import { GameStats } from './entities/game.entity';
import { GameHistory } from './entities/GameHistory.entity';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
   TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User ,Channel, Channel_Membership, Chat, Message, Channel_Message, Friendship, GameStats, GameHistory]),
    UserModule,
    AuthModule,
    PassportModule.register( {session: true}),
    DashboardModule,
    ProfiledataModule,
    UploadModule,
    DataModule,
    StatusModule,
    AddfriendModule,
    TfaModule,
    FriendModule,
    GameModule,
    ChatModule,
    ChannelModule,
  ],
  // exports: [TypeOrmModule],
})
export class AppModule {}
