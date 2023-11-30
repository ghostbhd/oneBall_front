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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const chat_service_1 = require("./chat.service");
const socket_io_1 = require("socket.io");
const user_service_1 = require("../User/user.service");
let ChatGateway = class ChatGateway {
    constructor(chatService, userService) {
        this.chatService = chatService;
        this.userService = userService;
    }
    async handleRequestLatestMessages(client, userId) {
        const latestMessages = await this.chatService.getLatestMessagesForAllChats(userId);
        client.emit('latest-messages', latestMessages);
    }
    async handleRequestMessagesForChat(client, payload) {
        const chatData = await this.chatService.getMessagesForChat(payload.chatId);
        client.emit('messages-for-chat-response', chatData);
        console.log(`Messages requested for chat ${payload.chatId}`);
    }
    handleJoinChat(client, payload) {
        client.join(`chat_room${payload.chatId}`);
    }
    handleLeaveChat(client, payload) {
        client.leave(`chat_room${payload.chatId}`);
    }
    async handleSendMessage(client, payload, callback) {
        try {
            const message = await this.chatService.sendMessage(payload.chatId, payload.content);
            this.server.to(`chat_room${payload.chatId}`).emit('new-message', message);
            if (callback && typeof callback === 'function') {
                callback({ success: true, messageId: message.id });
            }
        }
        catch (error) {
            if (callback && typeof callback === 'function') {
                callback({ success: false, error: error.message });
            }
            else {
                console.error('Error sending message:', error);
            }
        }
    }
    async handleSearchUser(client, payload) {
        try {
            const currentUser = await this.userService.findUserById(payload.currentUserId);
            const chat = await this.chatService.findOrCreateChat(currentUser, payload.username);
            client.emit('search-user-response', { chatId: chat.id });
        }
        catch (error) {
            client.emit('search-user-response', { chatId: null, error: error.message });
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('request-latest-messages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleRequestLatestMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('request-messages-for-chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleRequestMessagesForChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('send-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object, Function]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('search-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSearchUser", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        user_service_1.UserService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map