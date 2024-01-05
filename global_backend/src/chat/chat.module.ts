import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/Message.entity';
import { Chat } from 'src/entities/Chat.entity';
import { User } from 'src/entities/user.entity';
import { Channel} from 'src/entities/Channel.entity';
import { ChatController } from './chat.controller';
import { UserService } from 'src/user/user.service';
import { Channel_Membership} from 'src/entities/Channel_Membership.entity';
import { Friendship } from 'src/entities/Friendship.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Chat, User, Channel, Channel_Membership, Friendship]),
  ],
  providers: [ChatService, ChatGateway,UserService], 
  controllers: [ChatController],
  exports: [ChatService, TypeOrmModule],
})
export class ChatModule {}

