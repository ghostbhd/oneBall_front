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
exports.Channel = void 0;
const typeorm_1 = require("typeorm");
const Channel_Membership_entity_1 = require("./Channel_Membership.entity");
const Channel_Message_entity_1 = require("./Channel_Message.entity");
const user_entity_1 = require("./user.entity");
let Channel = class Channel {
};
exports.Channel = Channel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Channel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel.prototype, "Channel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Channel_Membership_entity_1.Channel_Membership, channel_membership => channel_membership.channelid),
    __metadata("design:type", Channel_Membership_entity_1.Channel_Membership)
], Channel.prototype, "channel_membershipid", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Channel_Message_entity_1.Channel_Message, channel_message => channel_message.channelid),
    __metadata("design:type", Channel_Message_entity_1.Channel_Message)
], Channel.prototype, "Channel_messageid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Channel.prototype, "owner", void 0);
exports.Channel = Channel = __decorate([
    (0, typeorm_1.Entity)()
], Channel);
//# sourceMappingURL=Channel.entity.js.map