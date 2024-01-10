import { Scope } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Player } from './queue/queue.service';

export type pl_inf = {
    Player : Player,
    y : number,
    ly : number,
    afks : number
}

export type state = {
    roomid : string;
    launched : boolean;
    pingpongs : number;
    salat : boolean;
    MAX_V : number;
    MAX_H : number;
    winner_id : number;
    type : string;
}

export class GameObj {
    constructor(public left_Player : Player, public right_Player : Player, public roomid : string, type : string) {
        this.state = {
            type : type,
            winner_id : -1,
            roomid: roomid,
            launched: false,
            pingpongs: 0,
            salat: false,
            MAX_V: 4973,
            MAX_H: 1500
        }
        this.left_plr = {
            Player: left_Player,
            y: 0,
            ly: 0,
            afks : 0
        }
        this.right_plr = {
            Player: right_Player,
            y: 0,
            ly: 0,
            afks : 0
        }
        this.ball = {
            x_dir: 1, y_dir: 1,
            v_dur: 4973,
            h_dur: 1500,
            v_state: { start: 0, pos: 0, id: -1, changed: 0, calc_time: 0, resolve: () => { } },
            h_state: { start: 0, dur: 0, id: -1, resolve: () => { } }
        }
    }
    public state : state
    public left_plr : pl_inf
    public right_plr : pl_inf
    public ball
}
