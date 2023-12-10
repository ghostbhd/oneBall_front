"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ormconfig_1 = require("./ormconfig");
const user_entity_1 = require("./entities/user.entity");
const Channel_entity_1 = require("./entities/Channel.entity");
const Channel_Membership_entity_1 = require("./entities/Channel_Membership.entity");
const Chat_entity_1 = require("./entities/Chat.entity");
const Message_entity_1 = require("./entities/Message.entity");
const Channel_Message_entity_1 = require("./entities/Channel_Message.entity");
const Friendship_entity_1 = require("./entities/Friendship.entity");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const chat_module_1 = require("./chat/chat.module");
const channel_module_1 = require("./chat/channel/channel.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const profiledata_module_1 = require("./profiledata/profiledata.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.config),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, Channel_entity_1.Channel, Channel_Membership_entity_1.Channel_Membership, Chat_entity_1.Chat, Message_entity_1.Message, Channel_Message_entity_1.Channel_Message, Friendship_entity_1.Friendship]),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            chat_module_1.ChatModule,
            channel_module_1.ChannelModule,
            dashboard_module_1.DashboardModule,
            profiledata_module_1.ProfiledataModule,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map