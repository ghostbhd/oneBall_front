"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const channel_service_1 = require("./channel.service");
const channel_controller_1 = require("./channel.controller");
const Channel_entity_1 = require("../../entities/Channel.entity");
const Channel_Membership_entity_1 = require("../../entities/Channel_Membership.entity");
const user_entity_1 = require("../../entities/user.entity");
const Message_entity_1 = require("../../entities/Message.entity");
const user_module_1 = require("../../User/user.module");
const chat_module_1 = require("../chat.module");
let ChannelModule = class ChannelModule {
};
exports.ChannelModule = ChannelModule;
exports.ChannelModule = ChannelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            chat_module_1.ChatModule,
            typeorm_1.TypeOrmModule.forFeature([Channel_entity_1.Channel, Channel_Membership_entity_1.Channel_Membership, user_entity_1.User, Message_entity_1.Message])
        ],
        providers: [channel_service_1.ChannelService],
        controllers: [channel_controller_1.ChannelController],
    })
], ChannelModule);
//# sourceMappingURL=channel.module.js.map