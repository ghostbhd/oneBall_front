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
exports.ProfiledataController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const data_1 = require("../data/data");
let ProfiledataController = class ProfiledataController {
    constructor(profiledata) {
        this.profiledata = profiledata;
    }
    async profile(req) {
        console.log(__dirname);
        console.log("siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiirrrrrrrrrrr" + req.user.username);
        console.log("this resource is protected");
        return (await this.profiledata.getInfoprofile(req.user.username));
    }
};
exports.ProfiledataController = ProfiledataController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfiledataController.prototype, "profile", null);
exports.ProfiledataController = ProfiledataController = __decorate([
    (0, common_1.Controller)('profileData'),
    __metadata("design:paramtypes", [data_1.Dataprofile])
], ProfiledataController);
//# sourceMappingURL=profiledata.controller.js.map