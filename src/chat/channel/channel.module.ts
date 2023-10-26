import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { Channel } from 'src/entities/Channel.entity';
import { Channel_Membership } from 'src/entities/Channel_Membership.entity';
import { User } from 'src/entities/user.entity';
import { Message } from 'src/entities/Message.entity';
import { UserModule } from 'src/User/user.module';
import { ChatModule } from '../chat.module';

@Module({
  imports: [
    UserModule,
    ChatModule,
    TypeOrmModule.forFeature([Channel, Channel_Membership, User, Message])
  ],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
