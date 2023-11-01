import { Injectable } from '@nestjs/common';

import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/User/user.service';
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

  async getChannelById(channelId: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne({ where: { id: channelId } });
    if (!channel) {
        throw new NotFoundException('Channel not found');
    }

    return channel;

  
}
async kickUserFromChannel(channelId: number, userId: number, requesterId: number): Promise<void> {
  const channel = await this.channelRepository.findOne({ where: { id: channelId } });
  const user = await this.userService.findUserById(userId);
  const requester = await this.userService.findUserById(requesterId);

  if (!channel || !user || !requester) {
    throw new NotFoundException('Channel or User not found');
  }

  const membership = await this.Channel_MembershipRepository.findOne({
    where: { channelid: channel, userid: user },
});

const requesterMembership = await this.Channel_MembershipRepository.findOne({
    where: { channelid: channel, userid: requester },
});


  if (!membership) {
    throw new NotFoundException('User is not a member of this channel' );
    
  }
  
  if (!requesterMembership) {
    console.log(user.id);
    throw new NotFoundException('Requester is not a member of this channel');
  }

  // Check if the user making the request is an administrator or the channel owner
if (!requesterMembership.isAdmin && channel.owner.id !== requester.id) {
  throw new UnauthorizedException('Only channel administrators or the owner can kick users');
}
  // Check if the target user is the channel owner
  // if (channel.owner.id === user.id) {
  //   throw new BadRequestException('Channel owners cannot be kicked');
  // }

  await this.Channel_MembershipRepository.remove(membership);//here where i removed the user from the channel
}


async getChannelMembers(channelId: number): Promise<Channel_Membership[]> {
  const channel = await this.channelRepository.findOne({ where: { id: channelId } });

  if (!channel) {
    throw new NotFoundException('Channel not found');
  }

  const members = await this.Channel_MembershipRepository.find({ 
    where: { channelid: channel },
    relations: ['userid']  // This ensures that user details are fetched along with the membership(date joined, etc.)
  });

  return members;
}

async setUserAsAdmin(channelId: number, userId: number, requesterId: number): Promise<void> {
  const channel = await this.channelRepository.findOne({ where: { id: channelId } });
  const user = await this.userService.findUserById(userId);
  const requester = await this.userService.findUserById(requesterId);

  if (!channel || !user || !requester) {
    throw new NotFoundException('Channel or User not found');
  }

  // Check if the user making the request is the channel owner
  if (channel.owner.id !== requester.id) {
    throw new UnauthorizedException('Only the channel owner can set administrators');
  }

  const membership = await this.Channel_MembershipRepository.findOne({
    where: { channelid: channel, userid: user },
  });

  if (!membership) {
    throw new NotFoundException('User is not a member of this channel');
  }

  // Set the user as an administrator
  membership.isAdmin = true;
  await this.Channel_MembershipRepository.save(membership);
}

async removeUserFromAdmin(channelId: number, userId: number, requesterId: number): Promise<void> {
  const channel = await this.channelRepository.findOne({ where: { id: channelId } });
  const user = await this.userService.findUserById(userId);
  const requester = await this.userService.findUserById(requesterId);

  if (!channel || !user || !requester) {
    throw new NotFoundException('Channel or User not found');
  }

  // Check if the user making the request is the channel owner
  if (channel.owner.id !== requester.id) {
    throw new UnauthorizedException('Only the channel owner can remove administrators');
  }

  const membership = await this.Channel_MembershipRepository.findOne({
    where: { channelid: channel, userid: user },
  });

  if (!membership) {
    throw new NotFoundException('User is not a member of this channel');
  }

  // If the user is the channel owner, they can't be removed from admin
  if (channel.owner.id === user.id) {
    throw new BadRequestException('Channel owner cannot be removed from administrators');
  }

  // Remove the user's administrator rights
  membership.isAdmin = false;
  await this.Channel_MembershipRepository.save(membership);
}

}


