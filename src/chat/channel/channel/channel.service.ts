import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
// import { SendMessageDto } from './dto/add-msg.dtp';
// import { CreateUserDto } from '../DTOS/create-user.dto';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/Chat.entity';
import { Channel} from 'src/entities/Channel.entity';
import { Channel_Membership} from 'src/entities/Channel_Membership.entity';
import { Channel_Message} from 'src/entities/Channel_Message.entity';
@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        // @InjectRepository(UserService)
        // private readonly UserService: Repository<UserService>,
        private readonly userService: UserService, 
        @InjectRepository(Chat)
        private readonly directMessageRepository: Repository<Chat>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
        @InjectRepository(Channel_Membership)
        private readonly Channel_MembershipRepository: Repository<Channel_Membership>,
    ) {}
    // channel.service.ts

async createChannelForUser(ownerId: number, channelName: string): Promise<Channel> {
    const owner = await this.userService.findUserById(ownerId);
    if (!owner) {
      throw new NotFoundException('User not found');
    }
    
    const channel = new Channel();
    channel.Channel = channelName;
    channel.owner = owner;
    
    return await this.channelRepository.save(channel);
  }
  
  async addMemberToChannel(channelId: number, userId: number): Promise<Channel_Membership> {
    const channel = await this.channelRepository.findOne({ where: { id: channelId } });
    const user = await this.userService.findUserById(userId);    
    
    if (!channel || !user) {
      throw new NotFoundException('Channel or User not found');
    }
    
    const membership = new Channel_Membership();
    membership.userid = user;
    membership.channelid = channel;
    membership.DateJoined = new Date().toISOString();
    
    return await this.Channel_MembershipRepository.save(membership);  // Ensure you have injected membershipRepository
  }
  
  async sendMessageToChannel(channelId: number, senderId: number, content: string): Promise<Channel_Message> {
    const channel = await this.channelRepository.findOne({ where: { id: channelId } });
    const sender = await this.userService.findUserById(senderId);
    
    if (!channel || !sender) {
      throw new NotFoundException('Channel or User not found');
    }
    
    const message = new Channel_Message();
    message.channelid = channel;
    message.SenderUserid = sender;
    message.Content = content;
    message.Timestamp = new Date().toISOString();
    
    return await this.messageRepository.save(message);  // Ensure you have injected messageRepository
  }
      
}

//need to test all of these functions in postman
// So why did { id: channelId } not work directly?

// The reason { id: channelId } didn't work directly might be due to TypeORM expecting a full set of FindOneOptions when you provide an object to findOne. When you just provide { id: channelId }, TypeORM might be trying to match that object against its FindOneOptions type, and it doesn't match any known configuration. This could be seen as a bit counterintuitive since you'd expect an ORM to recognize an ID property directly, but it's part of TypeORM's design to be flexible and allow complex query options.

// When you use { where: { id: channelId } }, you're being explicit about your intentions: you want to find an entity where the id matches channelId. This fits the expected structure of FindOneOptions, and hence it works.

