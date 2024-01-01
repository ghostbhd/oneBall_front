import { Scope } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

export class GameObj {
    constructor(public left_socket : number, public right_socket : number, public roomid : string) {
        this.state = {
            roomid: roomid,
            launched: false,
            pingpongs: 0,
            salat: false,
            MAX_V: 4973,
            MAX_H: 1500
        }
        this.left_plr = {
            socket: left_socket,
            y: 0,
            effects: {}
        }
        this.right_plr = {
            socket: right_socket,
            y: 0,
            effects: {}
        }
        this.ball = {
            x_dir: 1, y_dir: 1,
            v_dur: 4973,
            h_dur: 1500,
            v_state: { start: 0, pos: 0, id: -1, changed: 0, calc_time: 0, resolve: () => { } },
            h_state: { start: 0, dur: 0, id: -1, resolve: () => { } }
        }
    }
    public state
    public left_plr
    public right_plr
    public ball
}
