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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const Message_entity_1 = require("../../entities/Message.entity");
const user_entity_1 = require("../../entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
const user_service_1 = require("../../User/user.service");
const typeorm_2 = require("typeorm");
const Chat_entity_1 = require("../../entities/Chat.entity");
const Channel_entity_1 = require("../../entities/Channel.entity");
const Channel_Membership_entity_1 = require("../../entities/Channel_Membership.entity");
const Channel_Message_entity_1 = require("../../entities/Channel_Message.entity");
let ChannelService = class ChannelService {
    constructor(messageRepository, userService, directMessageRepository, userRepository, channelRepository, Channel_MembershipRepository) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.directMessageRepository = directMessageRepository;
        this.userRepository = userRepository;
        this.channelRepository = channelRepository;
        this.Channel_MembershipRepository = Channel_MembershipRepository;
    }
    async createChannelForUser(ownerId, channelName) {
        const owner = await this.userService.findUserById(ownerId);
        if (!owner) {
            throw new common_2.NotFoundException('User not found');
        }
        const channel = new Channel_entity_1.Channel();
        channel.Channel = channelName;
        channel.owner = owner;
        return await this.channelRepository.save(channel);
    }
    async addMemberToChannel(channelId, userId) {
        const channel = await this.channelRepository.findOne({ where: { id: channelId } });
        const user = await this.userService.findUserById(userId);
        if (!channel || !user) {
            throw new common_2.NotFoundException('Channel or User not found');
        }
        const membership = new Channel_Membership_entity_1.Channel_Membership();
        membership.userid = user;
        membership.channelid = channel;
        membership.DateJoined = new Date().toISOString();
        return await this.Channel_MembershipRepository.save(membership);
    }
    async sendMessageToChannel(channelId, senderId, content) {
        const channel = await this.channelRepository.findOne({ where: { id: channelId } });
        const sender = await this.userService.findUserById(senderId);
        if (!channel || !sender) {
            throw new common_2.NotFoundException('Channel or User not found');
        }
        const message = new Channel_Message_entity_1.Channel_Message();
        message.channelid = channel;
        message.SenderUserid = sender;
        message.Content = content;
        message.Timestamp = new Date().toISOString();
        return await this.messageRepository.save(message);
    }
    async getChannelById(channelId) {
        const channel = await this.channelRepository.findOne({ where: { id: channelId } });
        if (!channel) {
            throw new common_2.NotFoundException('Channel not found');
        }
        return channel;
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Message_entity_1.Message)),
    __param(2, (0, typeorm_1.InjectRepository)(Chat_entity_1.Chat)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(Channel_entity_1.Channel)),
    __param(5, (0, typeorm_1.InjectRepository)(Channel_Membership_entity_1.Channel_Membership)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChannelService);
//# sourceMappingURL=channel.service.js.map