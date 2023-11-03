import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
export declare class ChatGateway {
    private readonly chatService;
    constructor(chatService: ChatService);
    server: Server;
    private clients;
    handleConnection(): void;
    handleDisconnect(): void;
    handleSendMessage(client: Socket, payload: {
        senderId: number;
        chatId: number;
        content: string;
    }): Promise<void>;
}
