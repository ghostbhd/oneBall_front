import { Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<{
        user: import("../entities/user.entity").User;
        profile: Profile;
        accessToken: string;
        refreshToken: string;
    }>;
}
export {};
