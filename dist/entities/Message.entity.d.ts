import { Chat } from "./Chat.entity";
import { User } from "./user.entity";
export declare class Message {
    id: number;
    chatid: Chat;
    SenderUserID: User;
    Content: string;
    Timestamp: string;
}
