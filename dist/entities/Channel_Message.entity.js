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
exports.Channel_Message = void 0;
const typeorm_1 = require("typeorm");
const Channel_entity_1 = require("./Channel.entity");
const user_entity_1 = require("./user.entity");
let Channel_Message = class Channel_Message {
};
exports.Channel_Message = Channel_Message;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Channel_Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Channel_entity_1.Channel, channel => channel.Channel_messageid),
    __metadata("design:type", Channel_entity_1.Channel)
], Channel_Message.prototype, "channelid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.channel_messageid),
    __metadata("design:type", user_entity_1.User)
], Channel_Message.prototype, "SenderUserid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel_Message.prototype, "Content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel_Message.prototype, "Timestamp", void 0);
exports.Channel_Message = Channel_Message = __decorate([
    (0, typeorm_1.Entity)()
], Channel_Message);
//# sourceMappingURL=Channel_Message.entity.js.map