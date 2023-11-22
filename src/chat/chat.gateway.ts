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
  
//   @SubscribeMessage('request-latest-messages')
//   async handleRequestLatestMessages(client: Socket, userId: number): Promise<void> {
//     const latestMessages = await this.chatService.getLatestMessagesForAllChats(userId);
//     client.emit('latest-messages', latestMessages);
//   }
  
//   @SubscribeMessage('request-direct-messages')
// async handleRequestDirectMessages(client: Socket, payload: { senderId: number; receiverId: number }): Promise<void> {
//   const messages = await this.chatService.getDirectMessagesBetweenUsers(payload.senderId, payload.receiverId);
//   client.emit('direct-messages-response', messages);
// }
//   // @SubscribeMessage('join-chat')
//   // handleJoinChat(client: Socket, payload: { chatId: number }) {
//   //   const { chatId } = payload;
//   //   client.join(`chat_${chatId}`);
//   // }

//   // @SubscribeMessage('leave-chat')
//   // handleLeaveChat(client: Socket, payload: { chatId: number }) {
//   //   const { chatId } = payload;
//   //   client.leave(`chat_${chatId}`);
//   // }

//   @SubscribeMessage('send-message')
//   async handleSendMessage(client: Socket, payload: { senderId: number; chatId: number; content: string }) {
//     // Save message to the database using ChatService
//     const message = await this.chatService.sendMessage(payload.senderId, payload.chatId, payload.content);
    
//     // Emit the message to all clients in the chat room
//     this.server.to(`chat_${payload.chatId}`).emit('new-message', message);
//   }

  
}
