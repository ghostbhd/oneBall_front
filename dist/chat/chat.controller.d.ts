import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getMessages(chatId: number): Promise<import("../entities/Message.entity").Message[]>;
    getChatsForUser(userId: number): Promise<import("../entities/Chat.entity").Chat[]>;
    getChatsByUserId(userId: number): Promise<import("../entities/Chat.entity").Chat[]>;
}
