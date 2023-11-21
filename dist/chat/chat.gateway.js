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
let ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
        this.connectedClients = new Set();
    }
    handleConnection(client) {
        if (this.connectedClients.has(client.id)) {
            console.log(`Duplicate connection attempt: ${client.id}`);
            return;
        }
        this.connectedClients.add(client.id);
        console.log(`Client connected: ${client.id}, total clients: ${this.connectedClients.size}`);
        client.emit('connection', 'Successfully connected to server');
    }
    handleDisconnect(client) {
        this.connectedClients.delete(client.id);
        console.log(`Client disconnected: ${client.id}, total clients: ${this.connectedClients.size}`);
    }
    async handleRequestLatestMessages(client, userId) {
        const latestMessages = await this.chatService.getLatestMessagesForAllChats(userId);
        client.emit('latest-messages', latestMessages);
    }
    async handleSendMessage(client, payload) {
        try {
            console.log(`Sending message from ${payload.senderId} to receiver ${payload.receiverId}`);
            const message = await this.chatService.sendMessage(payload.senderId, payload.receiverId, payload.content);
            console.log('Message saved:', message);
            this.server.emit('new-message', message);
            client.emit('message-sent-ack', { status: 'success', messageId: message.id });
        }
        catch (error) {
            console.error('Error sending message:', error);
            client.emit('message-sent', { status: 'error', error: error.message });
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
    (0, websockets_1.SubscribeMessage)('send-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map