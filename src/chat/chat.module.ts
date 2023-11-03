import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
// import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/Message.entity';
import { Chat } from 'src/entities/Chat.entity';
import { User } from 'src/entities/user.entity';
import { Channel} from 'src/entities/Channel.entity';
import { ChatController } from './chat.controller';
import { Channel_Membership} from 'src/entities/Channel_Membership.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat,User,Channel,Channel_Membership])],  
  providers: [ ChatService,],   
  controllers: [ChatController], 
  exports: [ChatService,TypeOrmModule],
})
export class ChatModule {}

// Think of NestJS modules as rooms in a house. If you have a toy (e.g., ChatService) in one room (ChatModule) 
// and you want to play with it in another room (AppModule), 
// you need to first ensure the toy is available to be shared (exported) and then bring it into the other room 
// (import the module).

// By exporting the ChatService from ChatModule and importing
//  ChatModule into AppModule, you made sure that the 
//  ChatGateway in AppModule could find and use the ChatService. That's why the error was resolved.