import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from '../chat.service';
import { Socket, Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
import{ChannelService} from './channel.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class ChannelGateway {

  constructor(private readonly channelService: ChannelService,
    private readonly userService: UserService,)
     { }
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

        console.log("in handleGetUserChannels handler");
  
      const userChannels = await this.channelService.getUserChannels(userId);
      // console.log("****", userChannels);
      client.emit('userChannels', userChannels);
    } catch (error) {

      console.error('Error fetching user channels:', error);
    }
  }
}
