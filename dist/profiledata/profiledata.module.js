"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfiledataModule = void 0;
const common_1 = require("@nestjs/common");
const profiledata_controller_1 = require("./profiledata.controller");
const profiledata_service_1 = require("./profiledata.service");
const data_module_1 = require("../data/data.module");
let ProfiledataModule = class ProfiledataModule {
};
exports.ProfiledataModule = ProfiledataModule;
exports.ProfiledataModule = ProfiledataModule = __decorate([
    (0, common_1.Module)({
        imports: [data_module_1.DataModule],
        controllers: [profiledata_controller_1.ProfiledataController],
        providers: [profiledata_service_1.ProfiledataService],
    })
], ProfiledataModule);
//# sourceMappingURL=profiledata.module.js.map