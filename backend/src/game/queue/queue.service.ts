import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { GameObj } from '../game.obj';

//I choose to encapsulate it as injectable because of the need to clear the queue whenever
//a disconnection occures which is handled globaly elsewhere in the code
export type Player = {
    Consecutiveafk: number;
    id: number;
    socket: Socket;
    lasty : number;
}
export type MyPair = {
    waiter: number;
    joiner: number;
}

@Injectable()
export class QueueService {
    public players: Player[] = []
    public games: GameObj[] = []
    public games_size: number = -1

    public mymap: Map<number, number[]>
    public pv_players: Player[] = []
    public pv_rooms: MyPair[] = []
    public mutex: Promise<number>
    public p_mutex: Promise<number>
}
