import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './chat.dto/add-msg.dtp';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    
    // @Post('/send-message')
    // async sendMessage(@Body() createChatDto: CreateChatDto) {
    //     return this.chatService.sendMessage(createChatDto.senderId, createChatDto.receiverId, createChatDto.content);
    // }
    
    @Get('/get-messages/:chatId')
async getMessages(@Param('chatId') chatId: number) {
    return this.chatService.getMessages(chatId);
}

@Get('/get-chats/:userId')
async getChatsForUser(@Param('userId') userId: number) {
    return this.chatService.listChatsForUser(userId);
}


// @Get('/conv/:senderId/:receiverId')
//     async getDirectMessagesBetweenUsers(@Param('senderId') senderId: number, @Param('receiverId') receiverId: number) {
//       console.log("senderId: " + senderId + " receiverId: " + receiverId); 
//       return await this.chatService.getDirectMessagesBetweenUsers(senderId, receiverId);
//     }


@Get('allchats/:userId')
getChatsByUserId(@Param('userId') userId: number) {
  return this.chatService.getChatsByUserId(userId);
}

}
