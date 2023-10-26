import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { SendMessageDto } from './chat.dto/add-msg.dtp';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/Chat.entity';
import { Channel } from 'src/entities/Channel.entity';
import { Channel_Membership } from 'src/entities/Channel_Membership.entity';
export declare class ChatService {
    private readonly messageRepository;
    private readonly directMessageRepository;
    private readonly userRepository;
    private readonly channelRepository;
    private readonly Channel_MembershipRepository;
    constructor(messageRepository: Repository<Message>, directMessageRepository: Repository<Chat>, userRepository: Repository<User>, channelRepository: Repository<Channel>, Channel_MembershipRepository: Repository<Channel_Membership>);
    create(createChatDto: SendMessageDto): string;
    findAll(): string;
    remove(id: number): string;
}
