import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loging(): {
        msg: string;
    };
    googleLoginCallback(req: any, res: Response): Promise<{
        fff: string;
    }>;
    loginng(): {
        msg: string;
    };
    FortyTwoLoginCallback(req: any, res: Response): Promise<{
        fff: string;
    }>;
}
