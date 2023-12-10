import { Server } from 'socket.io';
export declare class ChannelGateway {
    server: Server;
    handleCreateChannel(client: any, data: any): Promise<void>;
}
