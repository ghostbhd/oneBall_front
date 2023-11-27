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
    getChat(sender: User, receiver: User): Promise<Chat>;
    sendMessage(senderId: number, receiverId: number, content: string): Promise<Message>;
    getChatHistory(chatId: number): Promise<Message[]>;
    listChatsForUser(userId: number): Promise<Chat[]>;
    getMessages(chatId: number): Promise<Message[]>;
    getAllChatIds(): Promise<number[]>;
    getDirectMessagesBetweenUsers(senderId: number, receiverId: number): Promise<any>;
    getMessagesForChat(chatId: number): Promise<any>;
    getLatestMessagesForAllChats(userId: number): Promise<any[]>;
    getChatsByUserId(userId: number): Promise<Chat[]>;
}
