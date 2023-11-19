import { WebSocketGateway, SubscribeMessage, MessageBody,WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { Chat } from 'src/entities/Chat.entity';
// import { SendMessageDto } from './chat.dto/add-msg.dtp';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/User/user.service';
import { CreateUserDto } from '../DTOS/create-user.dto';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  private clients: number = 0;

 
  handleConnection(client: Socket, ...args: any[]) {
  
    console.log(`Client connected: ${client.id}`);
    
    client.emit('connection', 'Successfully connected to server');
    const testMessage = { id: 1, content: 'This is a test message.', sender: 'TestSender', chatId: 1, avatar: 'path/to/avatar.jpg' };
    client.emit('latest-messages', [testMessage]);

  }

  handleDisconnect() {
    this.clients--;
    console.log('Client disconnected:', this.clients);
    
  }

  @SubscribeMessage('request-latest-messages')
  async handleRequestLatestMessages(client: Socket, userId: number): Promise<void> {
    const latestMessages = await this.chatService.getLatestMessagesForAllChats(userId);
    client.emit('latest-messages', latestMessages);
  }

@SubscribeMessage('send-message')
async handleSendMessage(client: Socket, payload: { senderId: number; chatId: number; content: string }): Promise<void> {
  const message = await this.chatService.sendMessage(payload.senderId, payload.chatId, payload.content);
  
 
  this.server.emit('new-message', message);
}
}
//   @SubscribeMessage('findAllChat')
//   findAll() {
//     return this.chatService.findAll();
//   }


//   @SubscribeMessage('removeChat')
//   remove(@MessageBody() id: number) {
//     return this.chatService.remove(id);
//   }
// }
