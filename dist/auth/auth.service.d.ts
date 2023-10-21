import { UserService } from 'src/User/user.service';
export declare class AuthService {
    private readonly userservice;
    constructor(userservice: UserService);
    signup(username: string, email: string, pass: string): Promise<import("../entities/user.entity").User>;
    signin(username: string, pass: string): Promise<import("../entities/user.entity").User>;
}
