import { Channel_Membership } from "./Channel_Membership.entity";
import { Channel_Message } from "./Channel_Message.entity";
import { User } from "./user.entity";
export declare class Channel {
    id: number;
    Channel: string;
    channel_membershipid: Channel_Membership;
    Channel_messageid: Channel_Message;
    owner: User;
}
