import { Injectable } from '@nestjs/common';
import { number } from 'prop-types';
import { Socket, Server } from 'socket.io';
import { GameObj } from '../game.obj';

//I choose to encapsulate it as injectable because of the need to clear the queue whenever
//a disconnection occures which is handled globaly elsewhere in the code
export type Player = {
    ConsecutiveLatencies: number; //lag management ===> after validation
    id: number;
    socket: Socket;
}

@Injectable()
export class QueueService {
    public pseudoMutex : number = 0
    public players: Player[] = []
    public games: GameObj[] = []
    public games_size: number = -1

    public mymap: Map<number, number>
    public pv_players: Player[] = []
}