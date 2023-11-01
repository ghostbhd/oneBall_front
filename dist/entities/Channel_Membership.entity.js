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
exports.Channel_Membership = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const Channel_entity_1 = require("./Channel.entity");
let Channel_Membership = class Channel_Membership {
};
exports.Channel_Membership = Channel_Membership;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Channel_Membership.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.channel_membershipid),
    __metadata("design:type", user_entity_1.User)
], Channel_Membership.prototype, "userid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Channel_entity_1.Channel, channel => channel.channel_membershipid),
    __metadata("design:type", Channel_entity_1.Channel)
], Channel_Membership.prototype, "channelid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel_Membership.prototype, "DateJoined", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Channel_Membership.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Channel_Membership.prototype, "muteExpiration", void 0);
exports.Channel_Membership = Channel_Membership = __decorate([
    (0, typeorm_1.Entity)()
], Channel_Membership);
//# sourceMappingURL=Channel_Membership.entity.js.map