import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/User/user.service';
import { NotFoundException } from '@nestjs/common';
import { Brackets } from 'typeorm';
import{CreateChatDto} from './chat.dto/add-msg.dtp';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/Chat.entity';
import { Channel} from 'src/entities/Channel.entity';
import { Channel_Membership} from 'src/entities/Channel_Membership.entity';


@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
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

    if (!sender) {
    throw new NotFoundException(`Sender with ID ${senderId} not found`);
  }

  if (!receiver) {
    throw new NotFoundException(`Receiver with ID ${receiverId} not found`);
  }
  newChat.sender = sender;
  newChat.receiver = receiver;
  newChat.DateStarted = new Date().toISOString();

  return await this.directMessageRepository.save(newChat); 
}

async getChat(sender: User, receiver: User): Promise<Chat> {

  let chat = await this.directMessageRepository.findOne({ where: { sender: sender, receiver: receiver } });

  
  if (!chat) {
      chat = await this.directMessageRepository.findOne({ where: { sender: receiver, receiver: sender } });
  }


  if (!chat) {
      chat = new Chat();
      chat.sender = sender;
      chat.receiver = receiver;
      chat.DateStarted = new Date().toISOString();
      await this.directMessageRepository.save(chat);
  }

  return chat;
}

async sendMessage(senderId: number, receiverId: number, content: string): Promise<Message> {
  const newMessage = new Message();
  const sender = await this.userRepository.findOne({ where: { id: senderId } });
  const receiver = await this.userRepository.findOne({ where: { id: receiverId } });

  if (!sender) {
    throw new NotFoundException(`Sender with ID ${senderId} not found`);
  }

  if (!receiver) {
    throw new NotFoundException(`Receiver with ID ${receiverId} not found`);
  }


  const chat = await this.getChat(sender, receiver);

  if (!chat) {
    throw new NotFoundException(`Chat not found for sender ${senderId} and receiver ${receiverId}`);
  }

  newMessage.SenderUserID = sender;
  newMessage.chatid = chat;
  newMessage.Content = content;
  newMessage.Timestamp = new Date().toISOString();
//   console.log("---------------//////////////------------------");
// console.log(newMessage);
try {
  console.log(`Attempting to save message from ${senderId} to ${receiverId}`);
  const savedMessage = await this.messageRepository.save(newMessage);
  console.log(`Message saved with ID: ${savedMessage.id}`);
  return savedMessage;
} catch (error) {
  console.error('Error saving message:', error);
  throw error;
}
}


async getChatHistory(chatId: number): Promise<Message[]> {
  return await this.messageRepository.find({ where: { chatid: { id: chatId } }, order: { Timestamp: 'DESC' } });
}

async listChatsForUser(userId: number): Promise<Chat[]> {
  return await this.directMessageRepository.find({
    where: [
      { sender: { id: userId } },
      { receiver: { id: userId } }
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

  async getAllChatIds(): Promise<number[]> {
    const chats = await this.directMessageRepository.find();
    return chats.map(chat => chat.id);
  }
  

  async getDirectMessagesBetweenUsers(senderId: number, receiverId: number): Promise<Chat[]> {

    return await this.directMessageRepository.createQueryBuilder("chat")
      .leftJoinAndSelect("chat.messageid", "message") 
      .where("(chat.senderId = :senderId AND chat.receiverId = :receiverId) OR (chat.senderId = :receiverId AND chat.receiverId = :senderId)", { senderId, receiverId })
      .orderBy("message.Timestamp", "DESC") 
      .getMany();
}

async getLatestMessagesForAllChats(userId: number): Promise<any[]> {
  const chats = await this.directMessageRepository.find({
    where: [
      { sender: { id: userId } },
      { receiver: { id: userId } }
    ],
    relations: ['messageid', 'sender', 'receiver'], 
  });


  return chats.map(chat => {
    const lastMessage = chat.messageid[chat.messageid.length - 1]; 
    return {
      id: chat.id,
      name: chat.receiver.id === userId ? chat.sender.username : chat.receiver.username,
      // avatar: chat.receiver.id === userId ? chat.sender.avatar : chat.receiver.avatar, 
      lastMessage: lastMessage.Content,
  
    };
  });
}


async getChatsByUserId(userId: number): Promise<Chat[]> {
  return await this.directMessageRepository.find({
    where: {sender: { id: userId },},
    relations: ['messageid', 'sender', 'receiver'],
  });
}

}
