import { ChatService } from './chat.service';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    sendDirectMessage(messageDto: any): any;
}
