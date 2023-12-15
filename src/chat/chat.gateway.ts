import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,

} from '@nestjs/websockets';

import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
// import { SocketService } from './channel/socket.service';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {

  constructor(private readonly chatService: ChatService,
    private readonly userService: UserService,
   ) { }
  @WebSocketServer() server: Server;

    // onConnection(client: Socket) {
    //   // this.socketService.insert(client.id, userId(jwt))
    // }

    

  @SubscribeMessage('request-latest-messages')
  async handleRequestLatestMessages(client: Socket, userId: number): Promise<void> {
    const latestMessages = await this.chatService.getLatestMessagesForAllChats(userId);
    client.emit('latest-messages', latestMessages);
  }


  @SubscribeMessage('request-messages-for-chat')
  async handleRequestMessagesForChat(client: Socket, payload: { chatId: number }): Promise<void> {
    // console.log("chat here ->", payload.chatId);
    const chatData = await this.chatService.getMessagesForChat(payload.chatId);

    client.emit('messages-for-chat-response', chatData);
    console.log(`Messages requested for chat ${payload.chatId}`);
  }

  @SubscribeMessage('join-chat')
  handleJoinChat(client: Socket, payload: { chatId: number }) {
    client.join(`chat_room${payload.chatId}`);
  }

  @SubscribeMessage('leave-chat')
  handleLeaveChat(client: Socket, payload: { chatId: number }) {
    client.leave(`chat_room${payload.chatId}`);
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(client: Socket, payload: { chatId: number; content: string ; senderId:number ; receiverid: number}) {
    try {
      console.log("Before sending ->", payload.content);
      const sender = await this.userService.findUserById(payload.senderId);
      const receiver = await this.userService.findUserById(payload.receiverid);
      console.log("the sendr id  in getway",sender);
      console.log("the receiver id in getway",receiver);

      const message = await this.chatService.sendMessage(payload.chatId, payload.content, sender, receiver);

      client.emit('new-message', message);


      console.log("After sending ->", payload.content);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }


  @SubscribeMessage('search-user')
  async handleSearchUser(client: Socket, payload: { username: string, currentUserId: number }): Promise<void> {
    try {
      const currentUser = await this.userService.findUserById(payload.currentUserId);
      const chat = await this.chatService.findOrCreateChat(currentUser, payload.username);
      client.emit('search-user-response', { chatId: chat.id });
    } catch (error) {
      client.emit('search-user-response', { chatId: null, error: error.message });
    }
  }

}
