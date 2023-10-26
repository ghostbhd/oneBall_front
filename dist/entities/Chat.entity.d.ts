import { User } from "./user.entity";
import { Message } from "./Message.entity";
export declare class Chat {
    id: number;
    DateStarted: string;
    userid1: User;
    userid2: User;
    content: string;
    messageid: Message[];
}
