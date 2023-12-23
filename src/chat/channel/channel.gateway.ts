import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from '../chat.service';
import { Socket, Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { ChannelService } from './channel.service';
import { subscribe } from 'diagnostics_channel';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ChannelGateway {

  constructor(private readonly channelService: ChannelService,
    private readonly userService: UserService,) { }
  @WebSocketServer() server: Server;


  @SubscribeMessage('createChannel')
  async handleCreateChannel(client: Socket, channelData: { ownerId: number, channelName: string, channelType: string, password?: string }) {

    const ownerId = channelData.ownerId;
    const channelName = channelData.channelName;
    const channelType = channelData.channelType;
    const password = channelData.password;

    const newchannel = await this.channelService.createChannelForUser(ownerId, channelName, channelType, password);
    this.server.emit('newChannelCreated', newchannel);
  }

  @SubscribeMessage('getUserChannels')
  async handleGetUserChannels(client: Socket, userId: number) {
    try {

      const userChannels = await this.channelService.getUserChannels(userId);
      // console.log("****", userChannels);
      client.emit('userChannels', userChannels);
    } catch (error) {

      console.error('Error fetching user channels:', error);
    }
  }


  @SubscribeMessage('joinChannel')
  async handleJoinChannel(client: Socket, data: { channelId: number, userId: number, password?: string }) {
    const { channelId, userId, password } = data;

    try {
      await this.channelService.joinChannel(channelId, userId, password);
      const messages = await this.channelService.getChannelMessages(channelId);
      console.log("****************in join channel*******************")
      console.log("messages", messages);
      client.join(`channel-${channelId}`);
      this.server.to(`channel-${channelId}`).emit('channelMessages', { channelId, messages });
    } catch (error) {
      console.error('Error joining channel:', error);
    }
  }

  @SubscribeMessage('getChannelMessages')
  async handleGetChannelMessages(client: Socket, channelId: number) {
    try {
      const messages = await this.channelService.getChannelMessages(channelId);
      console.log("messages", messages);
      client.emit('channelMessages', { channelId, messages });
    } catch (error) {
      console.error('Error fetching channel messages:', error);
    }
  }


  @SubscribeMessage('sendMessageToChannel')
  async handleSendMessageToChannel(client: Socket, data: { channelId: number, senderId: number, content: string }) {
    const { channelId, senderId, content } = data;

    try {
      const newMessage = await this.channelService.sendMessageToChannel(channelId, senderId, content);
      console.log("newMessage", newMessage);
      this.server.to(`channel-${channelId}`).emit('newChannelMessage', newMessage);
    } catch (error) {
      console.error('Error sending message to channel:', error);
    }
  }



}