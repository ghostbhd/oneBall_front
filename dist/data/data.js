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
exports.DatadaShboard = exports.Dataprofile = void 0;
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
let Dataprofile = class Dataprofile {
    constructor(userService) {
        this.userService = userService;
    }
    async getInfoprofile(username) {
        const user = await this.userService.findUserByUn(username);
        console.log("his this the user===>" + JSON.stringify(user));
        return ({ editInnfo: {
                id: user.id,
                username: user.username,
                avatar: user.Avatar,
            },
            profileInfo: {
                image: user.Avatar,
                fullName: user.username,
                username: user.username,
                level: 5,
                games: 50,
                win: 37,
                lose: 13,
                xp: 400,
                state: 'online',
            },
            gameStatus: {
                leaderBoard: [
                    {
                        username: 'user1'
                    },
                    {
                        username: 'user2'
                    },
                    {
                        username: 'user3'
                    }
                ],
                win: 37,
                lose: 13,
                games: 50,
                acheivement: []
            }
        });
    }
};
exports.Dataprofile = Dataprofile;
exports.Dataprofile = Dataprofile = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], Dataprofile);
let DatadaShboard = class DatadaShboard {
    constructor(userService) {
        this.userService = userService;
    }
    async getInfodashboard(username) {
        const user = await this.userService.findUserByUn(username);
        console.log("his this the user===>" + JSON.stringify(user));
        return ({
            user: {
                id: user.id,
                username: user.username,
                image: user.Avatar,
                status: 'online',
                fullName: user.username,
                level: 5.4,
                games: 50,
                win: 37,
                lose: 13,
            },
            last4Msg: [
                {
                    id: 1,
                    username: 'user1',
                    image: 'https://picsum.photos/200/200',
                    lastMessage: 'Hello from back-end',
                    status: 'online',
                    ischannel: false
                },
                {
                    id: 2,
                    username: 'user2',
                    image: 'https://picsum.photos/200/200',
                    lastMessage: 'Hi there',
                    status: 'online',
                    ischannel: true,
                    channelName: 'channel1'
                },
                {
                    id: 3,
                    username: 'user3',
                    image: 'https://picsum.photos/200/200',
                    lastMessage: 'How are you?',
                    status: 'offline',
                    ischannel: false
                },
                {
                    id: 4,
                    username: 'user4',
                    image: 'https://picsum.photos/200/200',
                    lastMessage: 'Good morning, goooooooooooooooooooooooooooooooooooooooooooooooo',
                    status: 'inGame',
                    ischannel: false
                }
            ],
            last6Games: [
                {
                    id: 1,
                    opponent: 'user1',
                    fullName: 'User 1',
                    result: 'lose',
                    date: 'Aug 30',
                    time: '10:00',
                },
                {
                    id: 2,
                    opponent: 'user2',
                    fullName: 'User 2',
                    result: 'win',
                    date: 'Aug 20',
                    time: '11:12',
                },
                {
                    id: 3,
                    opponent: 'user3',
                    fullName: 'User 3',
                    result: 'win',
                    date: 'Aug 19',
                    time: '18:00',
                },
                {
                    id: 4,
                    opponent: 'user4',
                    fullName: 'User 4',
                    result: 'lose',
                    date: 'Aug 15',
                    time: '20:00',
                },
                {
                    id: 5,
                    opponent: 'user5',
                    fullName: 'User 5',
                    result: 'win',
                    date: 'Aug 3',
                    time: '15:0',
                },
                {
                    id: 6,
                    opponent: 'user6',
                    fullName: 'User 6',
                    result: 'lose',
                    date: 'Aug 3',
                    time: '10:00',
                },
            ],
        });
    }
};
exports.DatadaShboard = DatadaShboard;
exports.DatadaShboard = DatadaShboard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], DatadaShboard);
;
//# sourceMappingURL=data.js.map