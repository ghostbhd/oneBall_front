import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
export declare class ChatGateway {
    private readonly chatService;
    constructor(chatService: ChatService);
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleRequestLatestMessages(client: Socket, userId: number): Promise<void>;
    handleRequestDirectMessages(client: Socket, payload: {
        senderId: number;
        receiverId: number;
    }): Promise<void>;
    handleJoinChat(client: Socket, payload: {
        chatId: number;
    }): void;
    handleLeaveChat(client: Socket, payload: {
        chatId: number;
    }): void;
    handleSendMessage(client: Socket, payload: {
        senderId: number;
        receiverId: number;
        content: string;
    }): Promise<void>;
}
