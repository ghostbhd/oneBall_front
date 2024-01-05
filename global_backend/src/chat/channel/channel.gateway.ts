import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ChatService } from "../chat.service";
import { Socket, Server } from "socket.io";
import { UserService } from "src/user/user.service";
import { ChannelService } from "./channel.service";
import { subscribe } from "diagnostics_channel";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChannelGateway {
  constructor(
    private readonly channelService: ChannelService,
    private readonly userService: UserService
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage("createChannel")
  async handleCreateChannel(
    client: Socket,
    channelData: {
      ownerId: number;
      channelName: string;
      channelType: string;
      password?: string;
    }
  ) {
    const ownerId = channelData.ownerId;
    const channelName = channelData.channelName;
    const channelType = channelData.channelType;
    const password = channelData.password;
    console.log("newchannel", channelName);

    const newchannel = await this.channelService.createChannelForUser(
      ownerId,
      channelName,
      channelType,
      password
    );
    this.server.emit("newChannelCreated", newchannel);
  }

  @SubscribeMessage("getUserChannels")
  async handleGetUserChannels(client: Socket, userId: number) {
    try {
      const userChannels = await this.channelService.getUserChannels(userId);
      // console.log("client==-====================", client);
      client.emit("userChannels", userChannels);
    } catch (error) {
      console.error("Error fetching user channels:", error);
    }
  }

  @SubscribeMessage("joinChannel")
  async handleJoinChannel(
    client: Socket,
    data: { channelId: number; userId: number; password?: string }
  ) {
    const { channelId, userId, password } = data;

    try {
      console.log("data of user want to join the channel:", data);
      await this.channelService.joinChannel(channelId, userId, password);
      const messages = await this.channelService.getChannelMessages(channelId);
      //console.log("****************in join channel*******************");
      client.join(`channel-${channelId}`);

      this.server
        .to(`channel-${channelId}`)
        .emit("channelMessages", { channelId, messages });

      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.userId
      );
      const channel = await this.channelService.getChannelById(channelId);
      const ownerId = channel.owner.id;
      //console.log("status", status);
      const members = await this.channelService.getChannelMembers(channelId);

      // this.server.to(ownerId.toString())
      // .emit("channelMessages", { channelId, messages });


      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);
      this.server.to(ownerId.toString()).emit("channelMembers", members);


      client.emit("channelMembershipStatus", {
        channelId: data.channelId,
        ...status,
      });

    } catch (error) {
      console.error("Error joining channel:", error);
    }
  }

  @SubscribeMessage("getChannelMessages")
  async handleGetChannelMessages(client: Socket, channelId: number) {
    try {
      const messages = await this.channelService.getChannelMessages(channelId);
      //console.log("messages", messages);

      client.emit("channelMessages", { channelId, messages });
    } catch (error) {
      console.error("Error fetching channel messages:", error);
    }
  }

  @SubscribeMessage("sendMessageToChannel")
  async handleSendMessageToChannel(
    client: Socket,
    data: { channelId: number; senderId: number; content: string }
  ) {
    const { channelId, senderId, content } = data;

    try {
      const newMessage = await this.channelService.sendMessageToChannel(
        channelId,
        senderId,
        content
      );
      //console.log("newMessage", newMessage);
      this.server
        .to(`channel-${channelId}`)
        .emit("newChannelMessage", newMessage);

        const channel = await this.channelService.getChannelById(data.channelId);
        const ownerId = channel.owner.id;

        this.server
        .to(ownerId.toString())
        .emit("newChannelMessage", newMessage);

    } catch (error) {
      console.error("Error sending message to channel:", error);
    }
  }

  @SubscribeMessage("getChannelType")
  async handleGetChannelType(client: Socket, channelId: number) {
    try {
      const channelType = await this.channelService.getChannelType(channelId);
      client.emit("channelType", { channelId, channelType });
    } catch (error) {
      console.error("Error getting channel type:", error);
    }
  }

  @SubscribeMessage("checkChannelMembership")
  async handleCheckChannelMembership(
    client: Socket,
    data: { channelId: number; userId: number }
  ) {
    // try {

    //console.log("data &&&&&&&&&&&&&&&&&&&&&&&&&&&&", data);
    const status = await this.channelService.getUserChannelStatus(
      data.channelId,
      data.userId
    );
    client.emit("channelMembershipStatus", {
      channelId: data.channelId,
      ...status,
    });
    // } catch (error) {
    //   client.emit('channelMembershipStatus', { channelId: data.channelId, ...status });
    //   console.error('Error checking channel membership:', error);
    // }
  }

  @SubscribeMessage("leaveChannel")
  async handleLeaveChannel(
    client: Socket,
    data: { channelId: number; userId: number }
  ) {
    try {
      //console.log("data of user want to leave the channel:", data);
      await this.channelService.leaveChannel(data.channelId, data.userId);
      client.leave(`channel-${data.channelId}`);
      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.userId
      );
      //console.log("status", status);
      client.emit("channelMembershipStatus", {
        channelId: data.channelId,
        ...status,
      });
      const members = await this.channelService.getChannelMembers(
        data.channelId
      );
      console.log("members", members);
      const channel = await this.channelService.getChannelById(data.channelId);
      const ownerId = channel.owner.id;
      //console.log("ownerId", ownerId);
      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);
      this.server.to(ownerId.toString()).emit("channelMembers", members);

    } catch (error) {
      console.error("Error leaving channel:", error);
    }
  }

  @SubscribeMessage("getChannelMembers")
  async handleGetChannelMembers(client: Socket, channelId: number) {
    try {
      const members = await this.channelService.getChannelMembers(channelId);
      //console.log("members", members);
      client.emit("channelMembers", members);
    } catch (error) {
      console.error("Error fetching channel members:", error);
    }
  }

  @SubscribeMessage("kickUserFromChannel")
  async handleKickUserFromChannel(
    client: Socket,
    data: { channelId: number; userId: number; requesterId: number }
  ) {
    try {
      // console.log("data of user want to kick the channel:", data);
      console.log("[[[[[]]]]]:", data.userId);
      console.log("[[[[[]]]]]:", data.requesterId);

      await this.channelService.kickUserFromChannel(
        data.channelId,
        data.userId,
        data.requesterId
      );
      const messages = await this.channelService.getChannelMessages(
        data.channelId
      );
      client.leave(`channel-${data.channelId}`);

      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.requesterId
      );

      const members = await this.channelService.getChannelMembers(
        data.channelId
      );

      const channel = await this.channelService.getChannelById(data.channelId);
      const ownerId = channel.owner.id;
      this.server.to(ownerId.toString()).emit("channelMembers", members);

      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);
      // this.server
      // .to(ownerId.toString())
      // .emit("channelMembershipStatus", {
      //   channelId: data.channelId,
      //   ...status,
      // });
      this.server
        .to(data.requesterId.toString())
        .emit("channelMembershipStatus", {
          channelId: data.channelId,
          ...status,
        });
    } catch (error) {
      console.error("Error kicking user from channel:", error);
    }
  }

  @SubscribeMessage("ChanegePassword")
  async handleChanegePassword(
    client: Socket,
    channelId: number,
    newPassword: string
  ) {
    try {
      const rut = await this.channelService.changeChannelPassword(
        channelId,
        newPassword
      );
      client.emit("passupdated", true);
    } catch (error) {
      client.emit("is false ", false);
      throw error;
    }
  }

  
  @SubscribeMessage("BanUser")
  async handlebanUser(
    client: Socket,
    data: { channelId: number, userId: number, targetUserId: number }
    ) {
    try {
      const Ban = await this.channelService.banUserFromChannel(
        data.channelId, data.userId,data.targetUserId
      );
      const client2 = this.server.sockets.sockets.get(Ban);
      client2.join(`buned-${data.channelId}`);
      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.targetUserId
      );

      const members = await this.channelService.getChannelMembers(
        data.channelId
      );

      const channel = await this.channelService.getChannelById(data.channelId);
      const ownerId = channel.owner.id;
      this.server.to(ownerId.toString()).emit("channelMembers", members);
      // const room = `admin-${data.channelId}`;
      // console.log(room);

        console.log(`admin-${data.channelId}`);
      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);
      this.server
        .to(data.targetUserId.toString())
        .emit("channelMembershipStatus", {
          channelId: data.channelId,
          ...status,
        });
      
    } catch (error) {
      client.emit("is false ", false);
      throw error;
    }
  }

  @SubscribeMessage("UnBanUser")
  async handleUnbanUser(
    client: Socket,
    data: { channelId: number; userId: number; targetUserId: number }
    ) {
      try {
        const Ban = await this.channelService.unbanUserFromChannel(
          data.channelId, data.userId,data.targetUserId
      );
      client.leave(`buned-${data.channelId}`);
      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.targetUserId
      );

      const members = await this.channelService.getChannelMembers(
        data.channelId
      );

      const channel = await this.channelService.getChannelById(data.channelId);
      const ownerId = channel.owner.id;
      this.server.to(ownerId.toString()).emit("channelMembers", members);
      // const room = `admin-${data.channelId}`;
      // console.log(room);

        console.log(`admin-${data.channelId}`);
      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);
      this.server
        .to(data.targetUserId.toString())
        .emit("channelMembershipStatus", {
          channelId: data.channelId,
          ...status,
        });
      
    } catch (error) {
      client.emit("is false ", false);
      throw error;
    }
  }

  @SubscribeMessage("MuteUser")
  async handleMuteUser(
    client: Socket,
    data: { channelId: number; userId: number; targetUserId: number }
    ) {
      try {

        console.log("TARGET USER ID", data.targetUserId);
        const Mute = await this.channelService.muteUserInChannel(data.channelId, data.userId,data.targetUserId);
      const client2 = this.server.sockets.sockets.get(Mute);
      client2.join(`muted-${data.channelId}`);
      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.targetUserId
      );

      const members = await this.channelService.getChannelMembers(
        data.channelId
      );

      const channel = await this.channelService.getChannelById(data.channelId);
      const ownerId = channel.owner.id;
      this.server.to(ownerId.toString()).emit("channelMembers", members);
      // const room = `admin-${data.channelId}`;
      // console.log(room);

        console.log(`admin-${data.channelId}`);
      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);
      this.server
        .to(data.targetUserId.toString())
        .emit("channelMembershipStatus", {
          channelId: data.channelId,
          ...status,
        });
      
    } catch (error) {
      client.emit("is false ", false);
      throw error;
    }
  }

  @SubscribeMessage("UnMuteUser")
  async handleUnMuteUser(
    client: Socket,
    data: { channelId: number; userId: number; targetUserId: number }
    ) {
      try {
      const UnMute = await this.channelService.unmuteUserInChannel(
        data.channelId,
        data.userId,
        data.targetUserId
      );
           
      client.leave(`muted-${data.channelId}`);
      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.targetUserId
      );

      const members = await this.channelService.getChannelMembers(
        data.channelId
      );

      const channel = await this.channelService.getChannelById(data.channelId);
      const ownerId = channel.owner.id;
      this.server.to(ownerId.toString()).emit("channelMembers", members);
      // const room = `admin-${data.channelId}`;
      // console.log(room);


      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);
      this.server
        .to(data.targetUserId.toString())
        .emit("channelMembershipStatus", {
          channelId: data.channelId,
          ...status,
        });
      
    } catch (error) {
      client.emit("is false ", false);
      throw error;
    }
  }
  
  @SubscribeMessage("setUserAsAdmin")
  async handleSetUserAsAdmin(
    client: Socket,
    data: { channelId: number; userId: number; requesterId: number }
    ) {
      // const { channelId, userId, requesterId } = data;
      
    try {
      // console.log("data of user want to set as admin the channel:", data);
      const socket = await this.channelService.setUserAsAdmin(
        data.channelId,
        data.userId,
        data.requesterId
      );
      
        const client2 = this.server.sockets.sockets.get(socket);
      this.server
        .to(`channel-${data.channelId}`)
        .emit("userSetAsAdmin", (data.channelId, data.userId));

        client2.join(`admin-${data.channelId}`);
        console.log(`admin-${data.channelId}`);
        const members = await this.channelService.getChannelMembers(
          data.channelId
          );
          const channel = await this.channelService.getChannelById(data.channelId);
      const ownerId = channel.owner.id;
      //console.log("ownerId", ownerId);

      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.requesterId
      );

      this.server.to(ownerId.toString()).emit("channelMembers", members);
      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);

      this.server
      .to(data.requesterId.toString())
      .emit("channelMembershipStatus", {
          channelId: data.channelId,
          ...status,
        });
      } catch (error) {
      //console.error("Error setting user as admin:", error.message);
      
      /*client.emit(
        "adminOperationFailed",
        (data.channelId, data.userId, error.message)
      );
      */
    }
  }

  @SubscribeMessage("removeUserFromAdmin")
  async handleRemoveUserFromAdmin(
    client: Socket,
    data: { channelId: number; userId: number; requesterId: number }
    ) {
    // const { channelId, userId, requesterId } = data;
    console.log("data of user want to set as admin the channel:", data);
    
    try {
      await this.channelService.removeUserFromAdmin(
        data.channelId,
        data.userId,
        data.requesterId
        );
        
        this.server
        .to(`channel-${data.channelId}`)
        .emit("userRemovedFromAdmin", data.channelId, data.userId);
        
        client.leave(`admin-${data.channelId}`);
        console.log(`admin-${data.channelId}`);
      const members = await this.channelService.getChannelMembers(
        data.channelId
        );
      const channel = await this.channelService.getChannelById(data.channelId);
      const ownerId = channel.owner.id;
      //console.log("ownerId", ownerId);
      
      const status = await this.channelService.getUserChannelStatus(
        data.channelId,
        data.requesterId
      );

      this.server.to(ownerId.toString()).emit("channelMembers", members);
      this.server.to(`admin-${data.channelId}`).emit("channelMembers", members);

      this.server
        .to(data.requesterId.toString())
        .emit("channelMembershipStatus", {
          channelId: data.channelId,
          ...status,
        });
    } catch (error) {
      //console.error("Error removing user from admin:", error.message);
      
      client.emit(
        "adminOperationFailed",
        data.channelId,
        data.userId,
       // error.message
      );
    }
  }

  // @SubscribeMessage('getSenderIdsInChannel')
  // async handleGetSenderIdsInChannel(client: Socket, channelId: number) {
    //   try {
  //     const senderIds = await this.channelService.getSenderIdsInChannel(channelId);
  //     //console.log("senderIds <<<<<<<<<<<<<<<<<<", senderIds);
  //     client.emit('senderIdsInChannel', senderIds);
  //   } catch (error) {
    //     console.error('Error fetching sender IDs in channel:', error);
  //   }
  // }
}
  // @SubscribeMessage('PasswordCheck')
  // async handlePasswordCheck(client: Socket, channelId: number, pass: string) {
  //   try{
  //     const res = await this.channelService.checkpassword(channelId , pass);

  //   }
  //   catch
  //   {

  //   }

  // }
