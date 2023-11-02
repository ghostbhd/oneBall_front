import { User } from "./user.entity";
import { Channel } from "./Channel.entity";
export declare class Channel_Membership {
    id: number;
    userid: User;
    channelid: Channel;
    DateJoined: string;
    isAdmin: boolean;
    muteExpiration: Date;
    isBanned: boolean;
    bannedBy: number;
    mutedBy: number;
}
