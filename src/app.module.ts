import { Module } from '@nestjs/common';
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
import { UserModule } from './User/user.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User ,Channel, Channel_Membership, Chat, Message, Channel_Message, Friendship]),
    UserModule,
    AuthModule,
    ChatModule,
  ],
  providers: [ChatGateway],
  // exports: [TypeOrmModule],
})
export class AppModule {}
