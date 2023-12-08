import { DatadaShboard } from 'src/data/data';
export declare class DashboardController {
    private readonly datadashboard;
    constructor(datadashboard: DatadaShboard);
    get_dashboard_info(req: any): Promise<{
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
