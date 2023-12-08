import { AuthService } from './auth.service';
declare const FortyTwoStrategy_base: new (...args: any[]) => any;
export declare class FortyTwoStrategy extends FortyTwoStrategy_base {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};
