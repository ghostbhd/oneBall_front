import { AuthDto } from 'src/DTOS/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: AuthDto): Promise<import("../entities/user.entity").User>;
    signin(body: AuthDto): Promise<import("../entities/user.entity").User>;
}
