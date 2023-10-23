import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ChatGateway, ChatService,TypeOrmModule],
})
export class ChatModule {}
