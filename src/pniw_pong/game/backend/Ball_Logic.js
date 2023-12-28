
const MAX_V = 4973
const MAX_H = 1500
const PLAYER_TO_MAX = 0.15
const SPEED_LIMIT = 540
const MID_BALL_TO_MAX_V = 0.019021739 // (35 / 920)/ 2
//const MID_BALL_TO_MAX_V = 0.0175

function timeout(ms, inf, n) {
    return new Promise((resolve) => {
        if (n == 1) {
            inf.ball.v_state.resolve = resolve
            inf.ball.v_state.id = setTimeout(() => {
                resolve()
            }, ms);
            //console.log("this is n", n, inf.ball.v_state.id)
        }
        else
            setTimeout(() => {
                resolve()
            }, ms);
    });
}

function upd_vertical_pos(inf) {
    let dir = inf.ball.y_dir == 1 ? 1 : -1
    let dist = ((Date.now() - inf.ball.v_state.start) / inf.state.MAX_V) * dir
    //console.log("dist ", dist)
    let r = inf.ball.v_state.pos + dist
    console.log("prev ", inf.ball.v_state.pos, " now ", Math.abs(Number(r).toPrecision(5)))
    return (Math.abs(Number(r).toPrecision(5)))
}


function salat(inf) {
    inf.state.salat = true
    if (inf.ball.v_state.id != -1) {
        clearTimeout(inf.ball.v_state.id)
        inf.ball.v_state.id = -1
        inf.ball.v_state.resolve()
    }
}

async function horizontal_bouncing(io, socket, inf) {

    while (inf.state.salat == false) {

        inf.ball.h_state.start = Date.now()
        const hh = await timeout(inf.ball.h_dur, inf, 0)

        inf.ball.x_dir = inf.ball.x_dir == 1 ? 0 : 1
        let pl_y = inf.ball.x_dir == 1 ? inf.left_plr.y : inf.right_plr.y

        let ball_y = upd_vertical_pos(inf) + MID_BALL_TO_MAX_V

        //bounce or score a goal ==> 
        if (ball_y <= pl_y + PLAYER_TO_MAX && ball_y >= pl_y) {
            //cross or normal bounce ==>
            if ((inf.ball.y_dir === 1 && ball_y < pl_y + (PLAYER_TO_MAX / 2))
                || ((inf.ball.y_dir === 0 && ball_y > pl_y + (PLAYER_TO_MAX / 2)))) {
                //cross bounce ==>
                console.log("pl_y", pl_y)
                if (inf.ball.v_state.id != -1) {
                    inf.ball.v_state.pos = upd_vertical_pos(inf)
                    console.log("changed pos from horizental ==>>", inf.ball.v_state.pos)
                    inf.ball.v_state.changed = 1
                    clearTimeout(inf.ball.v_state.id)
                    inf.ball.v_state.id = -1
                    inf.ball.v_state.resolve()
                }
                else
                    console.log("wtf")
            }
        }
        else {
            /*
            salat(inf)
            let data = { winner: inf.ball.x_dir == 1 ? 2 : 1 }
            io.emit("salat", data)
            break
                */
        }

        // accelarate ==>
        if (inf.ball.h_dur - 20 <= SPEED_LIMIT)
            inf.ball.h_dur = SPEED_LIMIT
        else
            inf.ball.h_dur -= 20

        console.log("MAX SPEED", inf.ball.h_dur)
        io.emit("ball:horizontal:bounce", { dir: inf.ball.x_dir, dur: inf.ball.h_dur })
    }
}

async function vertical_bouncing(io, socket, inf) {

    let _dur = 0
    while (inf.state.salat == false) {
        //console.log("starting vertical_bouncing")

        inf.ball.v_state.start = Date.now()

        if (inf.ball.v_state.changed == 1) {
            //console.log("changed dur = ", _dur)
            inf.ball.v_state.changed = 0
            await timeout(_dur, inf, 1)
            if (inf.state.salat == true)
                break

            inf.ball.y_dir = inf.ball.y_dir == 1 ? 0 : 1
        }
        else {
            await timeout(inf.ball.v_dur, inf, 1)

            if (inf.state.salat == true)
                break

            inf.ball.y_dir = inf.ball.y_dir == 1 ? 0 : 1
        }

        if (inf.ball.v_state.changed == 1) {
            _dur = inf.ball.y_dir == 1 ? ((1 - inf.ball.v_state.pos) * inf.state.MAX_V) : inf.ball.v_state.pos * inf.state.MAX_V
            //console.log("cleared sending new _dur =", _dur,
            //"cuz pos ===>", inf.ball.v_state.pos, "ydir ==>", inf.ball.y_dir)
            io.emit("ball:vertical:bounce", { dir: inf.ball.y_dir, dur: _dur, pos: inf.ball.v_state.pos })
        }
        else {
            inf.ball.v_state.pos = inf.ball.y_dir == 1 ? 0 : 1
            io.emit("ball:vertical:bounce", { dir: inf.ball.y_dir, dur: inf.ball.v_dur, pos: inf.ball.v_state.pos })
        }

        //console.log("server : vertical bounce ", "=============================")
    }
}

async function BounceLogic(io, socket, inf) {
    vertical_bouncing(io, socket, inf)
    horizontal_bouncing(io, socket, inf)
}

async function Ball_Logic(io, socket, inf) {

    const time_out_id = await timeout(100, 0)

    if (inf.state.launched == false) {
        console.log("frist_ping")
        io.emit("ball:first_ping", { h_dur: inf.ball.h_dur, v_dur: inf.ball.v_dur })

        inf.state.launched = true

        BounceLogic(io, socket, inf)
    }
}

export default Ball_Logic
