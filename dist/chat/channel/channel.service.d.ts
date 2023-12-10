import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/Chat.entity';
import { Channel } from 'src/entities/Channel.entity';
import { Channel_Membership } from 'src/entities/Channel_Membership.entity';
import { Channel_Message } from 'src/entities/Channel_Message.entity';
export declare class ChannelService {
    private readonly messageRepository;
    private readonly userService;
    private readonly directMessageRepository;
    private readonly userRepository;
    private readonly channelRepository;
    private readonly Channel_MembershipRepository;
    constructor(messageRepository: Repository<Message>, userService: UserService, directMessageRepository: Repository<Chat>, userRepository: Repository<User>, channelRepository: Repository<Channel>, Channel_MembershipRepository: Repository<Channel_Membership>);
    createChannelForUser(ownerId: number, channelName: string, channelType: string): Promise<Channel>;
    addMemberToChannel(channelId: number, userId: number, channelPassword?: string): Promise<Channel_Membership>;
    sendMessageToChannel(channelId: number, senderId: number, content: string): Promise<Channel_Message>;
    getChannelById(channelId: number): Promise<Channel>;
    kickUserFromChannel(channelId: number, userId: number, requesterId: number): Promise<void>;
    getChannelMembers(channelId: number): Promise<Channel_Membership[]>;
    setUserAsAdmin(channelId: number, userId: number, requesterId: number): Promise<void>;
    removeUserFromAdmin(channelId: number, userId: number, requesterId: number): Promise<void>;
    banUserFromChannel(channelId: number, targetUserId: number, actorUserId: number): Promise<void>;
    unbanUserFromChannel(channelId: number, targetUserId: number): Promise<void>;
    muteUserInChannel(channelId: number, targetUserId: number, actorUserId: number, durationMinutes: number): Promise<void>;
    unmuteUserInChannel(channelId: number, targetUserId: number): Promise<void>;
}
