import { Server } from "socket.io"

import Ball_Logic from "./Ball_Logic.js";


export default function RealTimeLogic(io) {

    const inf = {
        state: {
            launched: false,
            pingpongs: 0,
            salat: false,
            MAX_V: 4973,
            MAX_H: 1500
        },
        left_plr: {
            y: 0,
            effects: {}
        },
        right_plr: {
            y: 0,
            effects: {}
        },
        ball: {
            x_dir: 1, y_dir: 1,
            v_dur: 4973,
            h_dur: 1500,
            v_state: { start: 0, pos: new Number(0), id: -1, changed: 0, calc_time: 0, resolve: () => { } },
            h_state: { start: 0, dur: 0, id: -1, resolve: () => { } }
        }
    }

    //tobe_handled : lag could cause some sort of reconnection ==>
    //in that case i should check the socket.io docs to see if they have a backoff strategy to protect the server ==>
    //i should handle the info refresh as well : ==> (maybe a backoff strateg)
    //tobe_handled : the player position should be checked in the server to know whether to horizontal:bounce the ball or
    //alert game over

    io.on("connection", (socket) => {
        console.log(`connected: ${socket.id}`);
        io.emit('get:right_plr:y', inf.right_plr.y)
        io.emit('get:left_plr:y', inf.left_plr.y)

        socket.on('post:left_plr:y', (data) => {
            if (inf.state.launched == true) {
                inf.left_plr.y = data
                io.emit('get:left_plr:y', inf.left_plr.y)
                console.log("left", inf.left_plr.y)
            }
        })

        socket.on('post:right_plr:y', (data) => {
            if (inf.state.launched == true) {
                inf.right_plr.y = data
                io.emit('get:right_plr:y', inf.right_plr.y)
                //console.log("right", inf.right_plr.y)
            }
        })

        Ball_Logic(io, socket, inf)


        socket.on("disconnect", () => {
            // clear
            console.log(`disconnect: ${socket.id}`);
        });
    });
}
