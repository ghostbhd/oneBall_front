import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
export declare class ChatGateway {
    private readonly chatService;
    private readonly userService;
    constructor(chatService: ChatService, userService: UserService);
    server: Server;
    handleRequestLatestMessages(client: Socket, userId: number): Promise<void>;
    handleRequestMessagesForChat(client: Socket, payload: {
        chatId: number;
    }): Promise<void>;
    handleJoinChat(client: Socket, payload: {
        chatId: number;
    }): void;
    handleLeaveChat(client: Socket, payload: {
        chatId: number;
    }): void;
    handleSendMessage(client: Socket, payload: {
        chatId: number;
        content: string;
    }): Promise<void>;
    handleSearchUser(client: Socket, payload: {
        username: string;
        currentUserId: number;
    }): Promise<void>;
}
