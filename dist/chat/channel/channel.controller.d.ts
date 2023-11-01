import { ChannelService } from './channel.service';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    createChannel(ownerId: number, channelName: string): Promise<import("../../entities/Channel.entity").Channel>;
    addMember(channelId: number, userId: number): Promise<import("../../entities/Channel_Membership.entity").Channel_Membership>;
    sendMessage(channelId: number, senderId: number, content: string): Promise<import("../../entities/Channel_Message.entity").Channel_Message>;
    getChannel(channelId: number): Promise<import("../../entities/Channel.entity").Channel>;
    kickMember(channelId: number, userId: number, requesterId: number): Promise<void>;
    getChannelMembers(channelId: number): Promise<import("../../entities/Channel_Membership.entity").Channel_Membership[]>;
}
