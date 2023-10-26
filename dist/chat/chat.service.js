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
    create(createChatDto) {
        return 'This action adds a new chat';
    }
    findAll() {
        return `This action returns all chat`;
    }
    remove(id) {
        return `This action removes a #${id} chat`;
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