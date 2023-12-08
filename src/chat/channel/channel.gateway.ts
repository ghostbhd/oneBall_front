// channel.gateway.ts

import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChannelGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('createChannel')
  async handleCreateChannel(client: any, data: any) {
    // Handle channel creation logic here, e.g., saving to the database

    // After successfully creating the channel, emit a 'newChannelCreated' event to all connected clients
    this.server.emit('newChannelCreated', data);
  }
}
