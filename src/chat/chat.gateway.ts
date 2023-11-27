import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,

} from '@nestjs/websockets';

import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: {
  origin: '*',
    },
})
export class ChatGateway  {

  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer() server: Server;

  // @SubscribeMessage('testi')
  async handleConnection(client: Socket) {

    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {

    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('request-latest-messages')
  async handleRequestLatestMessages(client: Socket, userId: number): Promise<void> {
    const latestMessages = await this.chatService.getLatestMessagesForAllChats(userId);
    // console.log(`Latest messages requested for user ${userId}`);
    // console.log(`Latest messages: ${JSON.stringify(latestMessages)}`);
    client.emit('latest-messages', latestMessages);
  }
  
  // @SubscribeMessage('request-direct-messages')
  // async handleRequestDirectMessages(client: Socket, payload: { senderId: number; receiverId: number }): Promise<void> {
  //   const chatData = await this.chatService.getDirectMessagesBetweenUsers(payload.senderId, payload.receiverId);

  //   client.emit('direct-messages-response', chatData);
  //   console.log(`Direct messages requested between users ${payload.senderId} and ${payload.receiverId}`);
  // }
  
  @SubscribeMessage('request-messages-for-chat')
  async handleRequestMessagesForChat(client: Socket, payload: { chatId: number }): Promise<void> {
    const chatData = await this.chatService.getMessagesForChat(payload.chatId);
  
    client.emit('messages-for-chat-response', chatData);
    console.log(`Messages requested for chat ${payload.chatId}`);
  }

@SubscribeMessage('join-chat')
handleJoinChat(client: Socket, payload: { chatId: number }) {
  client.join(`chat_room${payload.chatId}`);
  // console.log(`Client ${client.id} joined chat room: chat_room${payload.chatId}`);
}

@SubscribeMessage('leave-chat')
handleLeaveChat(client: Socket, payload: { chatId: number }) {
  client.leave(`chat_room${payload.chatId}`);
  // console.log(`Client ${client.id} left chat room: chat_room${payload.chatId}`);
}

@SubscribeMessage('send-message')
// Inside your ChatGateway
async handleSendMessage(client: Socket, payload: { senderId: number; receiverId: number; content: string }) {
  const message = await this.chatService.sendMessage(payload.senderId, payload.receiverId, payload.content);
  console.log(`Message from senderId: ${payload.senderId} to receiverId: ${payload.receiverId} with content: ${payload.content}`);
  
  // Emit directly to a client for testing purposes
  client.emit('new-message', message);
}
  
}
