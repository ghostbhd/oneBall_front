import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from "@nestjs/websockets";

import { ChatService } from "./chat.service";
import { Socket, Server } from "socket.io";
import { UserService } from "src/user/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "src/entities/Chat.entity";
import { subscribe } from "diagnostics_channel";
// import { SocketService } from './channel/socket.service';

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    @InjectRepository(Chat)
    private readonly directMessageRepository: Repository<Chat>
  ) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage("request-latest-messages")
  async handleRequestLatestMessages(
    client: Socket,
    userId: number,
  ): Promise<void> {
    const latestMessages =
      await this.chatService.getLatestMessagesForAllChats(userId);
    client.emit("latest-messages", latestMessages);
  }

  @SubscribeMessage("request-messages-for-chat")
  async handleRequestMessagesForChat(
    client: Socket,
    payload: { chatId: number; sender_id: number }
  ): Promise<void> {
    const chatData = await this.chatService.getMessagesForChat(payload.chatId);
    client.emit("messages-for-chat-response", chatData);

  }

  @SubscribeMessage("join-chat")
  handleJoinChat(client: Socket, payload: { chatId: number }) {
    client.join(`chat_room${payload.chatId}`);
  }

  @SubscribeMessage("leave-chat")
  handleLeaveChat(client: Socket, payload: { chatId: number }) {
    client.leave(`chat_room${payload.chatId}`);
  }

  @SubscribeMessage("send-message")
  async handleSendMessage(
    client: Socket,
    payload: { chatId: number; Content: string; senderId: number }
  ) {
    try {
      const sender = await this.userService.findUserById(payload.senderId);

      const message = await this.chatService.sendMessage(
        payload.chatId,
        payload.Content,
        sender
      );

      const chat = await this.directMessageRepository.findOne({
        where: { id: payload.chatId },
        relations: ["receiver", "sender"],
      });

      // const chatData = await this.chatService.getMessagesForChat(
      //   payload.chatId
      // );

      const chatData = await this.chatService.getLastMessage(
        payload.chatId, sender
      );
     
      const messages = {

      id: chatData.SenderUserID.id,
      username: chatData.SenderUserID.username,
      image: chatData.SenderUserID.Avatar,
      lastMessage: chatData.Content,
      status: chatData.SenderUserID.status,
      ischannel: true,
      }
     console.log("whaaaaanaaaaaaaaa"); 
      client.emit("new-message", chatData);

      this.server
      .to(chatData.ReceiverUserID.id.toString())
      .emit("new-message", chatData);
      
      this.server
      .to(chatData.ReceiverUserID.id.toString())
      .emit("LastMessage-forDash", messages);

      const receiver =
        chat.sender.id === sender.id ? chat.receiver.id : chat.sender.id;
      const latestMessages =
      await this.chatService.getLatestMessagesForAllChats(sender.id);
      const latestMessagesres =
        await this.chatService.getLatestMessagesForAllChats(receiver);
      client.emit("latest-messages", latestMessages);
      this.server
        .to(receiver.toString())
        .emit("latest-messages", latestMessagesres);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  @SubscribeMessage("search-user")
  async handleSearchUser(
    client: Socket,
    payload: { username: string; currentUserId: number }
  ): Promise<void> {
    try {
      
      const currentUser = await this.userService.findUserById(
        payload.currentUserId
      );
      const chat = await this.chatService.findOrCreateChat(
        currentUser,
        payload.username
      );
      client.emit("search-user-response", { chatId: chat.id });
    } catch (error) {
      client.emit("search-user-response", {
        chatId: null,
        //error: error.message,
      });
    }
  }
}
