import { Channel } from "./Channel.entity";
import { User } from "./user.entity";
export declare class Channel_Message {
    id: number;
    channelid: Channel;
    SenderUserid: User;
    Content: string;
    Timestamp: string;
}
