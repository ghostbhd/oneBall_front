import { Injectable } from '@nestjs/common';

import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/Chat.entity';
import { Channel } from 'src/entities/Channel.entity';
import { Channel_Membership } from 'src/entities/Channel_Membership.entity';
import { Channel_Message } from 'src/entities/Channel_Message.entity';
@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel_Message)
    private readonly Channel_MRepository: Repository<Channel_Message>,
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Channel_Membership)
    private readonly Channel_MembershipRepository: Repository<Channel_Membership>,
  ) { }


  async createChannelForUser(ownerId: number, channelName: string, channelType: string, password?: string): Promise<Channel> {
    const owner = await this.userService.findUserById(ownerId);
    if (!owner) {
      throw new NotFoundException('User not found');
    }

    const channel = new Channel();
    channel.Channel = channelName;
    channel.owner = owner;
    console.log("channel name ", channel.Channel);
    console.log("channel owner", channel.owner);
    console.log("Received channel type:", channelType);
    switch (channelType) {
      case 'public':
        channel.public = true;
        console.log("create channel3", channel.public);
        break;
      case 'private':
        channel.private = true;
        console.log(" create channel4", channel.private);

        break;
      case 'protected':
        channel.protected = true;
        console.log(" create channel5", channel.protected);

        channel.password = password;
        console.log(" create channel6", channel.password);


        break;
      default:
        throw new BadRequestException('Invalid channel type');
    }

    return await this.channelRepository.save(channel);
  }


  async joinChannel(channelId: number, userId: number, password?: string): Promise<void> {
    const channel = await this.getChannelById(channelId);
    
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
  
    if (channel.public || (channel.protected && channel.password === password)) {
      await this.addMemberToChannel(channelId, userId, password);
    } else {
      throw new UnauthorizedException('Invalid channel access');
    }
  }
  
  async getUserChannels(userId: number): Promise<Channel[]> {
    const publicAndProtectedChannels = await this.channelRepository.find({
      where: [{ public: true }, { protected: true }],
    });
  
    const privateChannels = await this.channelRepository.find({
      where: {
        owner: { id: userId }, 
        private: true,
      },
    });
  
    const channels = [...publicAndProtectedChannels, ...privateChannels];
  
    return channels;
  }
  

  async getChannelMessages(channelId: number): Promise<any[]> {
    const channel = await this.getChannelById(channelId);
  
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }
  
    const messages = await this.Channel_MRepository.find({
      where: { channelid: channel },
      relations: ["SenderUserid"], // Include related User entity
      order: { Timestamp: 'ASC' },
    });
  

    return messages.map(message => ({
      id: message.id,
      Content: message.Content,
      Timestamp: message.Timestamp,
      senderId: message.SenderUserid.id,
      username: message.SenderUserid.username,
      avatar: message.SenderUserid.Avatar
    }));
  }
  

  async getChannelType(channelId: number): Promise<string> {
    const channel = await this.channelRepository.findOne({ where: { id: channelId } });

    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    if (channel.public) {
      return 'public';
    } else if (channel.protected) {
      return 'protected';
    } else if (channel.private) {
      return 'private';
    } else {
      throw new Error('Invalid channel type');
    }
  }




  async getUserChannelStatus(channelId: number, userId: number): Promise<{ isMember: boolean, isAdmin: boolean, isOwner: boolean }> {
    const channel = await this.channelRepository.findOne({ where: { id: channelId } });
    const membership = await this.Channel_MembershipRepository.findOne({
      where: { channelid: { id: channelId }, userid: { id: userId } },
    });
  
    return {
      isMember: !!membership,
      isAdmin: membership ? membership.isAdmin : false,
      isOwner: channel && channel.owner.id === userId
    };
  }

  
  
  async addMemberToChannel(channelId: number, userId: number, channelPassword?: string): Promise<Channel_Membership> {
    const channel = await this.channelRepository.findOne({ where: { id: channelId } });
    const user = await this.userService.findUserById(userId);

    if (!channel || !user) {
      throw new NotFoundException('Channel or User not found');
    }

    if (channel.protected && channel.password) {
      if (channel.password !== channelPassword) {
        throw new UnauthorizedException('Incorrect password');
      }
    }

    const membership = new Channel_Membership();
    membership.userid = user;
    membership.channelid = channel;
    membership.DateJoined = new Date().toISOString();

    return await this.Channel_MembershipRepository.save(membership); 
  }

  async sendMessageToChannel(channelId: number, senderId: number, content: string): Promise<any> {
    const channel = await this.channelRepository.findOne({ where: { id: channelId } });
    const sender = await this.userService.findUserById(senderId);

    if (!channel || !sender) {
      throw new NotFoundException('Channel or User not found');
    }

    // Create a new message entity
    const newMessage = new Channel_Message();
    newMessage.channelid = channel;
    newMessage.SenderUserid = sender;
    newMessage.Content = content;
    newMessage.Timestamp = new Date().toISOString();

    // Save the new message
    const savedMessage = await this.Channel_MRepository.save(newMessage);

    // Fetch the complete message with sender details
    const completeMessage = await this.Channel_MRepository.findOne({
        where: { id: savedMessage.id },
        relations: ["SenderUserid"]
    });

    // Map the message to include user details
    return {
        id: completeMessage.id,
        Content: completeMessage.Content,
        Timestamp: completeMessage.Timestamp,
        senderId: completeMessage.SenderUserid.id,
        username: completeMessage.SenderUserid.username,
        avatar: completeMessage.SenderUserid.Avatar
    };
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
      throw new NotFoundException('User is not a member of this channel');

    }

    if (!requesterMembership) {
      // console.log(user.id);
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
    //! check that the requested member is not the owner
    //! allow any admin to set other users as administrators 
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

  async banUserFromChannel(channelId: number, targetUserId: number, actorUserId: number): Promise<void> {
    const membership = await this.Channel_MembershipRepository.findOne({
      where: {
        channelid: { id: channelId },
        userid: { id: targetUserId }
      }
    });


    if (!membership) {
      throw new Error('User is not a member of this channel.');
    }

    if (membership.isAdmin) {
      throw new Error('Cannot ban the channel owner.');
    }

    membership.isBanned = true;
    membership.bannedBy = actorUserId;

    await this.Channel_MembershipRepository.save(membership);
  }

  async unbanUserFromChannel(channelId: number, targetUserId: number): Promise<void> {
    const membership = await this.Channel_MembershipRepository.findOne({
      where: {
        channelid: { id: channelId },
        userid: { id: targetUserId }
      }
    });
    if (membership && membership.isBanned) {
      membership.isBanned = false;
      membership.bannedBy = null;

      await this.Channel_MembershipRepository.save(membership);
    }
  }

  async muteUserInChannel(channelId: number, targetUserId: number, actorUserId: number, durationMinutes: number): Promise<void> {
    const membership = await this.Channel_MembershipRepository.findOne({
      where: {
        channelid: { id: channelId },
        userid: { id: targetUserId }
      }
    });
    if (!membership) {
      throw new Error('User is not a member of this channel.');
    }

    if (membership.isAdmin) {
      throw new Error('Cannot mute the channel owner.');
    }

    membership.muteExpiration = new Date(Date.now() + durationMinutes * 60 * 1000);
    membership.mutedBy = actorUserId;

    await this.Channel_MembershipRepository.save(membership);
  }

  async unmuteUserInChannel(channelId: number, targetUserId: number): Promise<void> {
    const membership = await this.Channel_MembershipRepository.findOne({
      where: {
        channelid: { id: channelId },
        userid: { id: targetUserId }
      }
    });
    if (membership && membership.muteExpiration) {
      membership.muteExpiration = null;
      membership.mutedBy = null;

      await this.Channel_MembershipRepository.save(membership);
    }
  }

  //! if the mute duration has collapsed, set the user as unmuted and create the message, otherwise throw ...chi tkherbi9a 

  // import { cron } from "node-cron";

  // cron.schedule("*/5 * * * *", async () => {
  //     const expiredMutes = await this.Channel_MembershipRepository.find({ where: { muteExpiration: LessThan(new Date()) } });
  //     for (const mute of expiredMutes) {
  //         mute.muteExpiration = null;
  //         mute.mutedBy = null;
  //         await this.Channel_MembershipRepository.save(mute);
  //     }
  // });


}


