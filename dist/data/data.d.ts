import { UserService } from "src/user/user.service";
export declare class Dataprofile {
    private readonly userService;
    constructor(userService: UserService);
    getInfoprofile(username: string): Promise<{
        editInnfo: {
            id: number;
            username: string;
            avatar: string;
        };
        profileInfo: {
            image: string;
            fullName: string;
            username: string;
            level: number;
            games: number;
            win: number;
            lose: number;
            xp: number;
            state: string;
        };
        gameStatus: {
            leaderBoard: {
                username: string;
            }[];
            win: number;
            lose: number;
            games: number;
            acheivement: any[];
        };
    }>;
}
export declare class DatadaShboard {
    private readonly userService;
    constructor(userService: UserService);
    getInfodashboard(username: string): Promise<{
        user: {
            id: number;
            username: string;
            image: string;
            status: string;
            fullName: string;
            level: number;
            games: number;
            win: number;
            lose: number;
        };
        last4Msg: ({
            id: number;
            username: string;
            image: string;
            lastMessage: string;
            status: string;
            ischannel: boolean;
            channelName?: undefined;
        } | {
            id: number;
            username: string;
            image: string;
            lastMessage: string;
            status: string;
            ischannel: boolean;
            channelName: string;
        })[];
        last6Games: {
            id: number;
            opponent: string;
            fullName: string;
            result: string;
            date: string;
            time: string;
        }[];
    }>;
}
