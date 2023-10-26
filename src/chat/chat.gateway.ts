import { WebSocketGateway, SubscribeMessage, MessageBody,WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { Chat } from 'src/entities/Chat.entity';
import { SendMessageDto } from './dto/add-msg.dtp';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/User/user.service';
import { CreateUserDto } from '../DTOS/create-user.dto';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  private clients: number = 0;

  handleConnection() {
    this.clients++;
    console.log('Client connected:', this.clients);
  }

  handleDisconnect() {
    this.clients--;
    console.log('Client disconnected:', this.clients);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): void {
    this.server.emit('message', message);  // Broadcasting the message to all connected clients
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
