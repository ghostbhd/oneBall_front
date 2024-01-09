import { Injectable } from "@nestjs/common";

import { Message } from "src/entities/Message.entity";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { Chat } from "src/entities/Chat.entity";
import { Channel } from "src/entities/Channel.entity";
import { Channel_Membership } from "src/entities/Channel_Membership.entity";
import { Channel_Message } from "src/entities/Channel_Message.entity";
import * as bcrypt from "bcrypt";

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
    private readonly Channel_MembershipRepository: Repository<Channel_Membership>
  ) {}

  async createChannelForUser(
    ownerId: number,
    channelName: string,
    channelType: string,
    password?: string
  ): Promise<Channel> {
    const owner = await this.userService.findUserById(ownerId);
    if (!owner) {
      throw new NotFoundException("User not found");
    }

    
    const channel = new Channel();
    channel.Channel = channelName;
    channel.owner = owner;
  
    switch (channelType) {
      case "public":
        channel.public = true;
        break;
      case "private":
        channel.private = true;

        break;
      case "protected":
        channel.protected = true;
        
        if (!password || password.trim() === '') {
          throw new BadRequestException("Password is required for a protected channel");
        }
        channel.password = await this.hashThePass(password);

        break;
      default:
        throw new BadRequestException("Invalid channel type");
    }

    const creation = await this.channelRepository.save(channel);
    return creation
  }

  async joinChannel(
    channelId: number,
    userId: number,
    password?: string
  ): Promise<void> {
    const channel = await this.getChannelById(channelId);

    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    if (channel.public) {
      await this.addMemberToChannel(channelId, userId);
    } else if (channel.protected) {

      if (password && channel.password) {
        const isMatch = await bcrypt.compare(password, channel.password);
        if (isMatch) {
          await this.addMemberToChannel(channelId, userId, password);
        } else {
          throw new UnauthorizedException("Invalid channel access");
        }
      } else {
        throw new BadRequestException(
          "Password is required for a protected channel"
        );
      }
    } else {
      throw new UnauthorizedException("Invalid channel access");
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
      throw new NotFoundException("Channel not found");
    }

    const messages = await this.Channel_MRepository.find({
      where: { channelid: channel },
      relations: ["SenderUserid"], // Include related User entity
      order: { Timestamp: "ASC" },
    });

    return messages.map((message) => ({
      id: message.id,
      Content: message.Content,
      Timestamp: message.Timestamp,
      senderId: message.SenderUserid.id,
      username: message.SenderUserid.username,
      avatar: message.SenderUserid.Avatar,
    }));
  }

  async getChannelType(channelId: number): Promise<string> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });

    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    if (channel.public) {
      return "public";
    } else if (channel.protected) {
      return "protected";
    } else if (channel.private) {
      return "private";
    } else {
      throw new Error("Invalid channel type");
    }
  }

  async getUserChannelStatus(
    channelId: number,
    userId: number
  ): Promise<{ channelName: string ,isMember: boolean; isAdmin: boolean; isOwner: boolean }> {
    try {
      const channel = await this.channelRepository.findOne({
        where: { id: channelId },
        relations: ["owner"],
      });

      const channelName = channel.Channel;
      if (!channel) {
        return { channelName: channelName, isMember: false, isAdmin: false, isOwner: false };
      }

      // Retrieve membership
      const membership = await this.Channel_MembershipRepository.findOne({
        where: { channelid: { id: channelId }, userid: { id: userId } },
      });
      return {
        channelName: channelName,
        isMember: membership ? membership.isMember : false ,
        isAdmin: membership ? membership.isAdmin : false,
        isOwner: channel.owner && channel.owner.id === userId ,
      };
    } catch (error) {
      
      console.error("Error checking channel membership:", error);
      return {  channelName: "", isMember: false, isAdmin: false, isOwner: false };
    }
  }

  async addMemberToChannel(
    channelId: number,
    userId: number,
    channelPassword?: string
  ): Promise<Channel_Membership> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    const user = await this.userService.findUserById(userId);
    if (!channel || !user) {
      throw new NotFoundException("Channel or User not found");
    }

    // if (channel.protected && channel.password) {
    //   if (channel.password !== channelPassword) {
    //     throw new UnauthorizedException("Incorrect password");
    //   }
    // }

    const membership = new Channel_Membership();
    membership.userid = user;
    membership.channelid = channel;
    membership.DateJoined = new Date().toISOString();
    membership.isMember = true;

    return await this.Channel_MembershipRepository.save(membership);
  }

  async sendMessageToChannel(
    channelId: number,
    senderId: number,
    content: string
  ): Promise<any> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    const sender = await this.userService.findUserById(senderId);

    if (!channel || !sender) {
      throw new NotFoundException("Channel or User not found");
    }

    // Create a new message entity
    const newMessage = new Channel_Message();
    newMessage.channelid = channel;
    newMessage.SenderUserid = sender;
    newMessage.Content = content;
    newMessage.Timestamp = new Date().toISOString();

    // Save the new message
    const savedMessage = await this.Channel_MRepository.save(newMessage);

    const completeMessage = await this.Channel_MRepository.findOne({
      where: { id: savedMessage.id },
      relations: ["SenderUserid"],
    });

    return {
      id: completeMessage.id,
      Content: completeMessage.Content,
      Timestamp: completeMessage.Timestamp,
      senderId: completeMessage.SenderUserid.id,
      username: completeMessage.SenderUserid.username,
      avatar: completeMessage.SenderUserid.Avatar,
    };
  }

  async getChannelById(channelId: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
      relations: ["owner"],
    });
    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    return channel;
  }

  async kickUserFromChannel(
    channelId: number,
    userId: number,
    requesterId: number
  ): Promise<void> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    const owner = await this.userService.findUserById(userId);
    const requester = await this.userService.findUserById(requesterId);


    if (!channel || !owner || !requester) {
      throw new NotFoundException("Channel or User not found");
    }

    const ownership = await this.channelRepository.findOne({
      where: { id: channelId, owner: owner },
    });

    const requesterMembership = await this.Channel_MembershipRepository.findOne(
      {
        where: { channelid: channel, userid: requester },
      }
    );

    if (!requesterMembership) {
      throw new NotFoundException("Requester is not a member of this channel");
    }

    if (requesterMembership.isAdmin !== true && owner.id == requesterId) {

      console.log("requesterMembership.isAdmin", requesterMembership.isAdmin);
      throw new UnauthorizedException(
        "Only channel administrators or the owner can kick users"
      );
    }


    await this.Channel_MembershipRepository.remove(requesterMembership);
  }


  async getChannelMembers(channelId: number): Promise<Channel_Membership[]> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });

    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    const members = await this.Channel_MembershipRepository.find({
      where: { channelid: channel },
      relations: ['userid', 'channelid'],
    });

    const membersWithDetails = members.map((member) => ({
      id: member.id,
      channelid: member.channelid,
      userid: member.userid,
      DateJoined: member.DateJoined,
      isAdmin: member.isAdmin,
      isMember: member.isMember,
      isOwner: member.isOwner,
      isBanned: member.isBanned,
      bannedID: member.bannedID,
      mutedID: member.mutedID,
      muteExpiration: member.muteExpiration,
      ismuted: member.ismuted,
      username: member.userid.username,
      avatar: member.userid.Avatar,
    }));

    return membersWithDetails;
  }

  async setUserAsAdmin(
    channelId: number,
    userId: number,
    requesterId: number
  ): Promise<string> {

    const channel = await this.channelRepository.findOne({
      where: { id: channelId }, relations: ["owner"]
    });
    const user = await this.userService.findUserById(userId);
    const requester = await this.userService.findUserById(requesterId);
    const socket = requester.socket
    if (!channel || !user || !requester) {
      
      throw new NotFoundException("Channel or User not found");
    }
    const isRequesterAdmin = await this.Channel_MembershipRepository.findOne({
      where: { channelid: channel, userid: requester },
    });

    if (
      channel.owner.id !== userId
    ) {
      throw new UnauthorizedException(
        "Only the channel owner or admins can set administrators"
      );
    }
    // if (channel.owner.id === .id) {
    //   throw new BadRequestException(
    //     "Cannot set the channel owner as an administrator"
    //   );
    // }

    const membership = await this.Channel_MembershipRepository.findOne({
      where: { channelid: channel, userid: requester },
    });

    if (!membership) {
      throw new NotFoundException("User is not a member of this channel");
    }

    membership.isAdmin = true;
    membership.isMember = false;
    await this.Channel_MembershipRepository.save(membership);
    return(socket);
  }

  async removeUserFromAdmin(
    channelId: number,
    userId: number,
    requesterId: number
  ): Promise<void> {

    const channel = await this.channelRepository.findOne({
      where: { id: channelId }, relations: ["owner"]
    });
    const user = await this.userService.findUserById(userId);
    const requester = await this.userService.findUserById(requesterId);


    if (!channel || !user || !requester) {
      throw new NotFoundException("Channel or User not found");
    }

    // Check if the user making the request is the channel owner
    if (channel.owner.id !== user.id) {
      throw new UnauthorizedException(
        "Only the channel owner can remove administrators"
      );
    }

    const membership = await this.Channel_MembershipRepository.findOne({
      where: { channelid: channel, userid: requester },
    });

    if (!membership) {
      throw new NotFoundException("User is not a member of this channel");
    }

    // If the user is the channel owner, they can't be removed from admin
    if (channel.owner.id !== userId) {
      throw new BadRequestException(
        "Channel owner cannot be removed from administrators"
      );
    }

    // Remove the user's administrator rights
    membership.isMember = true;
    membership.isAdmin = false;
    await this.Channel_MembershipRepository.save(membership);
  }

  async banUserFromChannel(
    channelId: number,
    targetUserId: number,
    actorUserId: number
  ): Promise<void> {
    const membership = await this.Channel_MembershipRepository.findOne({
      where: {
        channelid: { id: channelId },
        userid: { id: targetUserId },
      },
    });

    if (!membership) {
      throw new Error("User is not a member of this channel.");
    }

    if (membership.isAdmin) {
      throw new Error("Cannot ban the channel .");
    }

    membership.isBanned = true;
    membership.bannedID = targetUserId;

    await this.Channel_MembershipRepository.save(membership);
  }

  async unbanUserFromChannel(
    channelId: number,
    targetUserId: number
  ): Promise<void> {
    const membership = await this.Channel_MembershipRepository.findOne({
      where: {
        channelid: { id: channelId },
        userid: { id: targetUserId },
      },
    });
    if (membership && membership.isBanned) {
      membership.isBanned = false;
      membership.bannedID = null;

      await this.Channel_MembershipRepository.save(membership);
    }
  }

  async muteUserInChannel(
    channelId: number,
    targetUserId: number
  ): Promise<void> {
    const membership = await this.Channel_MembershipRepository.findOne({
      where: {
        channelid: { id: channelId },
        userid: { id: targetUserId },
      },
    });
    if (!membership) {
      throw new Error("User is not a member of this channel.");
    }

    if (membership.isAdmin) {
      throw new Error("Cannot mute the channel admin.");
    }

    // membership.muteExpiration = new Date(Date.now() + durationMinutes * 60 * 1000);
    membership.ismuted = true;
    membership.mutedID = targetUserId;

    await this.Channel_MembershipRepository.save(membership);
  }

  async unmuteUserInChannel(
    channelId: number,
    targetUserId: number
  ): Promise<void> {
    const membership = await this.Channel_MembershipRepository.findOne({
      where: {
        channelid: { id: channelId },
        userid: { id: targetUserId },
      },
    });
    // if (membership && membership.muteExpiration) {
    //   membership.muteExpiration = null;
    membership.ismuted = false;
    membership.mutedID = null;

    await this.Channel_MembershipRepository.save(membership);
    // }
  }

  async leaveChannel(channelId: number, userId: number): Promise<void> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
      relations: ["owner"],
    });
    const user = await this.userService.findUserById(userId);

    if (!channel || !user) {
      throw new NotFoundException("Channel or User not found");
    }

    const membership = await this.Channel_MembershipRepository.findOne({
      where: { channelid: channel, userid: user },
    });

    if (!membership) {
      throw new NotFoundException("User is not a member of this channel");
    }


    //  here i wanto see if the user is the owner of the channel or not
    if (channel.owner.id === user.id) {
      await this.channelRepository.remove(channel);
    } else {
      await this.Channel_MembershipRepository.remove(membership);
    }
    // membership.isMember = false;
  }

  //! if the mute duration has collapsed, set the user as unmuted and create the message, otherwise throw ...chi tkherbi9a

  async hashThePass(password: string) {
    const saltrounds = 10;

    const Hashedpassword = await bcrypt.hash(password, saltrounds);
    //console.log(Hashedpassword);
    return Hashedpassword;
  }

  async setChannelPassword(
    channelId: number,
    newPassword: string
  ): Promise<void> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });

    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    channel.public = false;
    channel.protected = true;
    channel.password = await this.hashThePass(newPassword);

    await this.channelRepository.save(channel);
  }

  async removeChannelPassword(channelId: number): Promise<void> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });

    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    channel.protected = false;
    channel.public = true;
    channel.password = null;

    await this.channelRepository.save(channel);
  }

  async changeChannelPassword(
    channelId: number,
    newPassword: string
  ): Promise<void> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });

    if (!channel) {
      throw new NotFoundException("Channel not found");
    }

    channel.password = await this.hashThePass(newPassword);

    await this.channelRepository.save(channel);
  }

  // async getSenderIdsInChannel(channelId: number): Promise<number[]> {
  //   const channel = await this.channelRepository.findOne(channelId, {
  //     relations: ['Channel_messageid'],
  //   });

  //   if (!channel) {
  //     throw new NotFoundException('Channel not found');
  //   }

  //   const senderIds = channel.Channel_messageid.map((message) => message.senderId);

  //   return senderIds;
  // }
}
