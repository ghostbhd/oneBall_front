import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;
  private connectedClients: Set<string> = new Set();

  handleConnection(client: Socket) {
    if (this.connectedClients.has(client.id)) {
      console.log(`Duplicate connection attempt: ${client.id}`);
      return;
    }

    this.connectedClients.add(client.id);
    console.log(`Client connected: ${client.id}, total clients: ${this.connectedClients.size}`);
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    console.log(`Client disconnected: ${client.id}, total clients: ${this.connectedClients.size}`);
  }
  
  @SubscribeMessage('request-latest-messages')
  async handleRequestLatestMessages(client: Socket, userId: number): Promise<void> {
    const latestMessages = await this.chatService.getLatestMessagesForAllChats(userId);
    client.emit('latest-messages', latestMessages);
  }
  
  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, payload: { senderId: number; receiverId: number; content: string }): Promise<void> {
    try {
      console.log(`Sending message from ${payload.senderId} to receiver ${payload.receiverId}`);
      const message = await this.chatService.sendMessage(payload.senderId, payload.receiverId, payload.content);
      console.log('Message saved:', message);
      this.server.emit('new-message', message);
      client.emit('message-sent-ack', { status: 'success', messageId: message.id });
    } catch (error) {
      console.error('Error sending message:', error);
      client.emit('message-sent', { status: 'error', error: error.message });
    }
  }


}
