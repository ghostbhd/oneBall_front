import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities/Message.entity';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/Chat.entity';
import { Channel } from 'src/entities/Channel.entity';
import { Channel_Membership } from 'src/entities/Channel_Membership.entity';


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
  ) { }




  async sendMessage(chatId: number, Content: string, sender: User): Promise<Message> {
    const chat = await this.directMessageRepository.findOne({
      where: { id: chatId },
      relations: ['sender', 'receiver'],
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    const receiver = chat.sender.id === sender.id ? chat.receiver : chat.sender;

    const newMessage = new Message();
    newMessage.chatid = chat;
    newMessage.SenderUserID = sender;
    newMessage.ReceiverUserID = receiver;
    newMessage.Content = Content;
    newMessage.Timestamp = new Date().toISOString();


    const savedMessage = await this.messageRepository.save(newMessage);

    return savedMessage;
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
      relations: ['messageid']
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }
    return chat.messageid;
  }


  

  async getDirectMessagesBetweenUsers(senderId: number, receiverId: number): Promise<any> {
    const chat = await this.directMessageRepository.findOne({
      where: {
        sender: { id: senderId },
        receiver: { id: receiverId },
      },
      relations: ['messageid'],
    });

    if (chat) {
      return {
        id: chat.id,
        messages: chat.messageid,
        sender: chat.sender,

      };
    }
    return { messages: [] };
  }


async getLastMessage(chatId: number, sender:User): Promise<Message> {
  {

      const chat = await this.directMessageRepository.findOne({
        where: { id: chatId , sender : sender },
        relations: ['messageid' ],
      });

    
      const mesaage  = await this.messageRepository.find({
        where:{chatid: chat},
        relations: ['SenderUserID', 'ReceiverUserID','chatid'],});

       return mesaage[mesaage.length-1];
      
    }
  }

  async getMessagesForChat(chatId: number): Promise<any> {
    
    const chat = await this.directMessageRepository.findOne({
      where: { id: chatId },
      relations: ['messageid', 'messageid.SenderUserID', 'messageid.ReceiverUserID', 'sender', 'receiver'],
    });

    if (chat) {
      return {

        id: chat.id,
        messages: chat.messageid.map(message => ({
          id: message.id,
          Content: message.Content,
          Timestamp: message.Timestamp,
          SenderUserID: message.SenderUserID,
          ReceiverUserID: message.ReceiverUserID,
          
        })),
        senderUsername: chat.receiver.username,
        
        senderAvatar: chat.sender.Avatar,
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
        { receiver: { id: userId } },
       
      ],
      relations: ['messageid', 'sender', 'receiver'],
    });


    return chats
    .filter(chat => chat.messageid && chat.messageid.length > 0)
    .map(chat => {
        const lastMessage = chat.messageid[chat.messageid.length - 1];
        const receiveravatar =chat.receiver.Avatar;
        const senderavatar =chat.sender.Avatar;
        const senderflag=chat.sender.id;
        const receiverflag= chat.receiver.id;
        // const timestamp = lastMessage.Timestamp;

        return {
          id: chat.id,
          name: chat.receiver.id === userId ? chat.sender.username : chat.receiver.username,
          lastMessage: lastMessage,
          receiveravatar: receiveravatar,
          senderavatar:senderavatar,
          senderflag:senderflag,
          receiverflag:receiverflag,
          // timestamp: ,
        };
      });
  }

  async getChatsByUserId(userId: number): Promise<Chat[]> {
    return await this.directMessageRepository.find({
      where: { sender: { id: userId }, },
      relations: ['messageid', 'sender', 'receiver'],
    });
  }



  async findOrCreateChat(currentUser: User, targetUsername: string): Promise<Chat> {
    const targetUser = await this.userRepository.findOne({
      where: { username: targetUsername },
    });

    if (currentUser.username === targetUsername) {
      throw new Error("Cannot create a chat with yourself.");
    }

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    let chat = await this.directMessageRepository.findOne({
      where: [
        { sender: currentUser, receiver: targetUser },
        { sender: targetUser, receiver: currentUser },
      ],
    });

    if (!chat) {
      chat = new Chat();
      chat.sender = currentUser;
      chat.receiver = targetUser;
      chat.DateStarted = new Date().toISOString();
      await this.directMessageRepository.save(chat);
    }

    return chat;
  }


}
