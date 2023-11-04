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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Friendship_entity_1 = require("./Friendship.entity");
const Chat_entity_1 = require("./Chat.entity");
const Message_entity_1 = require("./Message.entity");
const Channel_Membership_entity_1 = require("./Channel_Membership.entity");
const Channel_Message_entity_1 = require("./Channel_Message.entity");
const Channel_entity_1 = require("./Channel.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "pass", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Friendship_entity_1.Friendship, friendship => friendship.userid1),
    __metadata("design:type", Array)
], User.prototype, "friendship_reciver", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Friendship_entity_1.Friendship, friendship => friendship.userid2),
    __metadata("design:type", Array)
], User.prototype, "friendship_sender", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Chat_entity_1.Chat, chat => chat.sender),
    __metadata("design:type", Array)
], User.prototype, "chatid1", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Chat_entity_1.Chat, chat => chat.receiver),
    __metadata("design:type", Array)
], User.prototype, "chatid2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_entity_1.Message, message => message.SenderUserID),
    __metadata("design:type", Array)
], User.prototype, "messageid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Channel_Membership_entity_1.Channel_Membership, channel_members => channel_members.userid),
    __metadata("design:type", Channel_Membership_entity_1.Channel_Membership)
], User.prototype, "channel_membershipid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Channel_Message_entity_1.Channel_Message, channel_message => channel_message.SenderUserid),
    __metadata("design:type", Channel_Message_entity_1.Channel_Message)
], User.prototype, "channel_messageid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Channel_entity_1.Channel, channel => channel.owner),
    __metadata("design:type", Array)
], User.prototype, "ownedChannels", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map