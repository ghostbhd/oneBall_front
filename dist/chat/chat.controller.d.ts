import { ChatService } from './chat.service';
import { CreateChatDto } from './chat.dto/add-msg.dtp';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    sendMessage(createChatDto: CreateChatDto): Promise<import("../entities/Message.entity").Message>;
    getMessages(chatId: number): Promise<import("../entities/Message.entity").Message[]>;
    getChatsForUser(userId: number): Promise<import("../entities/Chat.entity").Chat[]>;
    getDirectMessagesBetweenUsers(senderId: number, receiverId: number): Promise<import("../entities/Chat.entity").Chat[]>;
}
