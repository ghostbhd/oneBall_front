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
  console.log(`time ${newMessage.Timestamp}`);
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
  

  async getDirectMessagesBetweenUsers(senderId: number, receiverId: number): Promise<any> {
    // Find the chat session between the two users
    const chat = await this.directMessageRepository.findOne({
      where: {
        sender: { id: senderId },
        receiver: { id: receiverId },
      },
      relations: ['messageid'],
    });
  
    // If the chat session exists, return the messages
    if (chat) {
      return {
        id: chat.id,
        messages: chat.messageid,
        sender: chat.sender,
        // ... include other properties you need
      };
    }
  
    // If the chat session doesn't exist, you might want to handle it differently
    // For example, return an empty messages array or throw an error
    return { messages: [] };
  }
  

  async getMessagesForChat(chatId: number): Promise<any> {
    // Find the chat session by chat ID
    const chat = await this.directMessageRepository.findOne({
      where: { id: chatId },
      relations: ['messageid', 'messageid.SenderUserID', 'sender', 'receiver'],
    });
  
    // If the chat session exists, return the messages along with sender and receiver details
    if (chat) {
      return {
        id: chat.id,
        messages: chat.messageid.map(message => ({
          id: message.id,
          content: message.Content,
          timestamp: message.Timestamp,
          senderId: message.SenderUserID.id, // Assuming SenderUserID relation is correctly configured
        })),
        // Access sender and receiver from the chat relation
        chatSenderId: chat.sender.id,
        chatReceiverId: chat.receiver.id,
      };
    }

  
    return { messages: [] };
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
      lastMessage: lastMessage ? lastMessage.Content : '',
      //here i need to add the channel name
      //need to add the avatar of the user and the status
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
