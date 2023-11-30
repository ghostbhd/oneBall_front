"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const Message_entity_1 = require("../entities/Message.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const Chat_entity_1 = require("../entities/Chat.entity");
const Channel_entity_1 = require("../entities/Channel.entity");
const Channel_Membership_entity_1 = require("../entities/Channel_Membership.entity");
let ChatService = class ChatService {
    constructor(messageRepository, directMessageRepository, userRepository, channelRepository, Channel_MembershipRepository) {
        this.messageRepository = messageRepository;
        this.directMessageRepository = directMessageRepository;
        this.userRepository = userRepository;
        this.channelRepository = channelRepository;
        this.Channel_MembershipRepository = Channel_MembershipRepository;
    }
    async startChat(senderId, receiverId) {
        const newChat = new Chat_entity_1.Chat();
        const sender = await this.userRepository.findOne({ where: { id: senderId } });
        const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
        if (!sender) {
            throw new common_2.NotFoundException(`Sender with ID ${senderId} not found`);
        }
        if (!receiver) {
            throw new common_2.NotFoundException(`Receiver with ID ${receiverId} not found`);
        }
        newChat.sender = sender;
        newChat.receiver = receiver;
        newChat.DateStarted = new Date().toISOString();
        return await this.directMessageRepository.save(newChat);
    }
    async getChat(sender, receiver) {
        let chat = await this.directMessageRepository.findOne({ where: { sender: sender, receiver: receiver } });
        if (!chat) {
            chat = await this.directMessageRepository.findOne({ where: { sender: receiver, receiver: sender } });
        }
        if (!chat) {
            chat = new Chat_entity_1.Chat();
            chat.sender = sender;
            chat.receiver = receiver;
            chat.DateStarted = new Date().toISOString();
            await this.directMessageRepository.save(chat);
        }
        return chat;
    }
    async sendMessage(chatId, content) {
        const chat = await this.directMessageRepository.findOne({
            where: { id: chatId },
            relations: ['sender', 'receiver'],
        });
        if (!chat) {
            throw new common_2.NotFoundException(`Chat with ID ${chatId} not found`);
        }
        const newMessage = new Message_entity_1.Message();
        newMessage.chatid = chat;
        newMessage.SenderUserID = chat.sender;
        newMessage.ReceiverUserID = chat.receiver;
        newMessage.Content = content;
        newMessage.Timestamp = new Date().toISOString();
        console.log(`receiver :${chat.sender}`);
        console.log(`sender :${chat.receiver}`);
        console.log(`Attempting to save message in chat ${chatId}`);
        const savedMessage = await this.messageRepository.save(newMessage);
        console.log(`Message saved with ID: ${savedMessage.id}`);
        return savedMessage;
    }
    async getChatHistory(chatId) {
        return await this.messageRepository.find({ where: { chatid: { id: chatId } }, order: { Timestamp: 'DESC' } });
    }
    async listChatsForUser(userId) {
        return await this.directMessageRepository.find({
            where: [
                { sender: { id: userId } },
                { receiver: { id: userId } }
            ]
        });
    }
    async getMessages(chatId) {
        const chat = await this.directMessageRepository.findOne({
            where: { id: chatId },
            relations: ['messageid']
        });
        if (!chat) {
            throw new common_2.NotFoundException(`Chat with ID ${chatId} not found`);
        }
        return chat.messageid;
    }
    async getAllChatIds() {
        const chats = await this.directMessageRepository.find();
        return chats.map(chat => chat.id);
    }
    async getDirectMessagesBetweenUsers(senderId, receiverId) {
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
    async getMessagesForChat(chatId) {
        const chat = await this.directMessageRepository.findOne({
            where: { id: chatId },
            relations: ['messageid', 'messageid.SenderUserID', 'sender', 'receiver'],
        });
        if (chat) {
            return {
                id: chat.id,
                messages: chat.messageid.map(message => ({
                    id: message.id,
                    content: message.Content,
                    timestamp: message.Timestamp,
                    senderId: message.SenderUserID.id,
                })),
                chatSenderId: chat.sender.id,
                chatReceiverId: chat.receiver.id,
            };
        }
        return { messages: [] };
    }
    async getLatestMessagesForAllChats(userId) {
        const chats = await this.directMessageRepository.find({
            where: [
                { sender: { id: userId } },
                { receiver: { id: userId } }
            ],
            relations: ['messageid', 'sender', 'receiver'],
        });
        return chats
            .filter(chat => chat.messageid && chat.messageid.length > 0)
            .map(chat => {
            const lastMessage = chat.messageid[chat.messageid.length - 1];
            return {
                id: chat.id,
                name: chat.receiver.id === userId ? chat.sender.username : chat.receiver.username,
                lastMessage: lastMessage ? lastMessage.Content : '',
            };
        });
    }
    async getChatsByUserId(userId) {
        return await this.directMessageRepository.find({
            where: { sender: { id: userId }, },
            relations: ['messageid', 'sender', 'receiver'],
        });
    }
    async findOrCreateChat(currentUser, targetUsername) {
        const targetUser = await this.userRepository.findOne({
            where: { username: targetUsername },
        });
        if (currentUser.username === targetUsername) {
            throw new Error("Cannot create a chat with yourself.");
        }
        if (!targetUser) {
            throw new common_2.NotFoundException('User not found');
        }
        let chat = await this.directMessageRepository.findOne({
            where: [
                { sender: currentUser, receiver: targetUser },
                { sender: targetUser, receiver: currentUser },
            ],
        });
        if (!chat) {
            chat = new Chat_entity_1.Chat();
            chat.sender = currentUser;
            chat.receiver = targetUser;
            chat.DateStarted = new Date().toISOString();
            await this.directMessageRepository.save(chat);
        }
        return chat;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Message_entity_1.Message)),
    __param(1, (0, typeorm_1.InjectRepository)(Chat_entity_1.Chat)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(Channel_entity_1.Channel)),
    __param(4, (0, typeorm_1.InjectRepository)(Channel_Membership_entity_1.Channel_Membership)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map