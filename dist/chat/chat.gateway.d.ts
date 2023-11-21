import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket, Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    constructor(chatService: ChatService);
    server: Server;
    private connectedClients;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleRequestLatestMessages(client: Socket, userId: number): Promise<void>;
    handleSendMessage(client: Socket, payload: {
        senderId: number;
        receiverId: number;
        content: string;
    }): Promise<void>;
}
