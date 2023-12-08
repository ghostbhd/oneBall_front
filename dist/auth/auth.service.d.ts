import { UserService } from '../user/user.service';
import { profile } from '../dtos/profile.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userservice;
    private jwtService;
    constructor(userservice: UserService, jwtService: JwtService);
    login(profile: profile): Promise<import("../entities/user.entity").User>;
    create_jwt(profile: profile): Promise<string>;
}
