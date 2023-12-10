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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    loging() {
        console.log("I m here mother f.....");
        return ({ msg: "the authentication is done well ;)" });
    }
    async googleLoginCallback(req, res) {
        console.log("profile here ===========" + (req));
        const accessToken = await this.authService.create_jwt({
            email: req.user.profile.emails[0].value,
            username: req.user.profile.emails[0].value.split("@")[0] + "_g",
            avatar: req.user.profile.photos[0].value
        });
        res.cookie('accessToken', accessToken);
        res.redirect("http://localhost:5173/CallBack");
        return ({ fff: 'ddddd' });
    }
    loginng() {
        console.log("I m here mother f.....");
        return ({ msg: "the authentication is done well ;)" });
    }
    async FortyTwoLoginCallback(req, res) {
        console.log("profile here ===========");
        const accessToken = await this.authService.create_jwt({
            email: req.user.profile.emails[0].value,
            username: req.user.profile.emails[0].value.split("@")[0] + "_42",
            avatar: req.user.profile.photos[0].value
        });
        res.cookie('accessToken', accessToken);
        res.redirect("http://localhost:5173/CallBack");
        return ({ fff: 'ddddd' });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('login/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loging", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLoginCallback", null);
__decorate([
    (0, common_1.Get)('login/FortyTwo'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('FortyTwo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginng", null);
__decorate([
    (0, common_1.Get)('FortyTwo/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('FortyTwo')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "FortyTwoLoginCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map