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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userservice, jwtService) {
        this.userservice = userservice;
        this.jwtService = jwtService;
    }
    async login(profile) {
        if (await this.userservice.findUserByUn(profile.username) != null) {
            const user = await this.userservice.findUserByUn(profile.username);
            console.log("======== user found =========");
            console.log("here is the return of findUserByUn----->>"
                + JSON.stringify(user));
            return (user);
        }
        console.log("======== creating new user =========");
        const user = await this.userservice.createUser(profile.username, profile.email, profile.avatar);
        return (user);
    }
    async create_jwt(profile) {
        const user = await this.userservice.findUserByUn(profile.username);
        const payload = { name: profile.username, sub: profile.email, id: user.id };
        console.log("the plyload is==================>" + JSON.stringify(payload));
        ;
        return (this.jwtService.signAsync(payload));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map