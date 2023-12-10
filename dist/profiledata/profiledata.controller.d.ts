import { Dataprofile } from 'src/data/data';
export declare class ProfiledataController {
    private readonly profiledata;
    constructor(profiledata: Dataprofile);
    profile(req: any): Promise<{
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
