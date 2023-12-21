import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { Channel_Message } from 'src/entities/Channel_Message.entity';
import { Channel_Membership } from 'src/entities/Channel_Membership.entity';
import { Channel } from 'src/entities/Channel.entity';
import { User } from 'src/entities/user.entity';
import { Message } from 'src/entities/Message.entity';
import { UserModule } from 'src/user/user.module';
import { ChatModule } from '../chat.module';
import { ChannelGateway } from './channel.gateway';


@Module({
  imports: [
    UserModule,
    ChatModule,
    TypeOrmModule.forFeature([Channel, Channel_Membership, User, Message,Channel_Message])
  ],
  providers: [ChannelService,ChannelGateway],
  controllers: [ChannelController],
  // exports:[]
})
export class ChannelModule {}
