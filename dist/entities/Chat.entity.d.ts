import { User } from "./user.entity";
import { Message } from "./Message.entity";
export declare class Chat {
    id: number;
    DateStarted: string;
    sender: User;
    receiver: User;
    content: string;
    messageid: Message[];
}
