import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/User/user.service';
import { NotFoundException } from '@nestjs/common';
import{CreateChatDto} from './chat.dto/add-msg.dtp';
// import { SendMessageDto } from './chat.dto/add-msg.dtp';
// import { CreateUserDto } from '../DTOS/create-user.dto';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/Chat.entity';
import { Channel} from 'src/entities/Channel.entity';
import { Channel_Membership} from 'src/entities/Channel_Membership.entity';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    // @InjectRepository(Chat)
    // private readonly direct: Repository<Chat>,
    @InjectRepository(Chat)
    private readonly directMessageRepository: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Channel_Membership)
    private readonly Channel_MembershipRepository: Repository<Channel_Membership>,
) {}
    
async startChat(senderId: number, receiverId: number): Promise<Chat> {
  const newChat = new Chat();
  const sender = await this.userRepository.findOne({ where: { id: senderId } });
  const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

  newChat.userid1 = sender;
  newChat.userid2 = receiver;
  newChat.DateStarted = new Date().toISOString();

  return await this.directMessageRepository.save(newChat); 
}

async sendMessage(senderId: number, chatId: number, content: string): Promise<Message> {
  const newMessage = new Message();
  const sender = await this.userRepository.findOne({ where: { id: senderId } });
  const chat = await this.directMessageRepository.findOne({ where: { id: chatId } });

  newMessage.SenderUserID = sender;
  newMessage.chatid = chat;
  newMessage.Content = content;
  newMessage.Timestamp = new Date().toISOString();

  return await this.messageRepository.save(newMessage);
}

async getChatHistory(chatId: number): Promise<Message[]> {
  return await this.messageRepository.find({ where: { chatid: { id: chatId } }, order: { Timestamp: 'DESC' } });
}

async listChatsForUser(userId: number): Promise<Chat[]> {
  return await this.directMessageRepository.find({
    where: [
      { userid1: { id: userId } },
      { userid2: { id: userId } }
    ]
  });
  }

  async getMessages(chatId: number): Promise<Message[]> {
    const chat = await this.directMessageRepository.findOne({ 
      where: { id: chatId },
      relations: ['messageid']});
    
    if (!chat) {
        throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }
    
    return chat.messageid;
}
  findAll() {
    return `This action returns all chat`;
  }
  async getAllChatIds(): Promise<number[]> {
    const chats = await this.directMessageRepository.find();
    return chats.map(chat => chat.id);
  }
  

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
