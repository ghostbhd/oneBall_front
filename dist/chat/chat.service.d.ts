import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
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
    startChat(senderId: number, receiverId: number): Promise<Chat>;
    sendMessage(senderId: number, chatId: number, content: string): Promise<Message>;
    getChatHistory(chatId: number): Promise<Message[]>;
    listChatsForUser(userId: number): Promise<Chat[]>;
    getMessages(chatId: number): Promise<Message[]>;
    findAll(): string;
    getAllChatIds(): Promise<number[]>;
    remove(id: number): string;
}
