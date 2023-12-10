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
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const auth_service_1 = require("./auth.service");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(AuthService) {
        super({
            clientID: '1087847398531-ka4fe7pu9jdopal6is01j81tnpstnqv3.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3009/auth/google/callback',
            scope: ['profile', 'email'],
        });
        this.AuthService = AuthService;
        console.log("the constructor of passport is called");
    }
    async validate(accessToken, refreshToken, profile) {
        console.log(profile);
        const user = await this.AuthService.login({ email: profile.emails[0].value, username: profile.emails[0].value.split("@")[0] + "_g", avatar: profile._json.picture });
        console.log(user);
        console.log("profile here");
        return { user, profile, accessToken, refreshToken };
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], GoogleStrategy);
//# sourceMappingURL=passport-config.js.map