import { Friendship } from './Friendship.entity';
import { Chat } from './Chat.entity';
import { Message } from './Message.entity';
import { Channel_Membership } from './Channel_Membership.entity';
import { Channel_Message } from './Channel_Message.entity';
import { Channel } from "./Channel.entity";
export declare class User {
    id: number;
    username: string;
    email: string;
    pass: string;
    friendship_reciver: Friendship[];
    friendship_sender: Friendship[];
    chatid1: Chat[];
    chatid2: Chat[];
    messageid: Message[];
    channel_membershipid: Channel_Membership;
    channel_messageid: Channel_Message;
    ownedChannels: Channel[];
}
