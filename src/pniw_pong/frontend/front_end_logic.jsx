import { useSpring } from "@react-spring/web"
import { Children, Fragment, useDebugValue, useEffect, useState } from "react"
import { useSocket } from "../../Socketio"
import { getHeaders } from "../../jwt_token"
import * as jwtDecode from "jwt-decode";
import { createContext } from "react";
import { Whoami } from "./index.jsx";


function CountDown({ children }) {
    const [time, settime] = useState(3)
    if (time === 0)
        return (children)
    if (time >= 1)
        setTimeout(() => settime(time - 1), 1000)

    return (
        <Fragment>

            <p className="w-30 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16">
                SSStarting iin {time}
            </p>
        </Fragment>
    )
}

export default function FrontEndLogic({ children, f_l }) {

    const [ingame, setingame] = useState(false)
    const [requested, setrequested] = useState(false)

    const [who_val, setwho_val] = useState()

    f_l.ws = useSocket()

    let ball_size = f_l.game_inf.ball_size
    let border_size = f_l.game_inf.border_size
    let pl_width = f_l.game_inf.pl_w

    const token = getHeaders().jwttt;
    const currentUserToken = jwtDecode.jwtDecode(token);
    console.log("current user id is ", currentUserToken.id);
    useEffect(() => {
        if (requested === false) {
            f_l.ws.emit("lija_bsmlah", { playerID: currentUserToken.id })
            setrequested(true)
            console.log("emited lija_bsmlah")
        }
        f_l.ws.on("opponent_found", (data, callback) => {
            callback({
                status: 'ok'
            })
            console.log("opponent_found !!")
            setwho_val(data)
            if (ingame === false) {
                setingame(true)
            }
            else {
                console.log("wtfff")
            }
            f_l.ws.on("salat", (data) => {
                f_l.b_apiy.pause()
                f_l.b_apix.pause()
                console.log("winner winner chicken dinner ", data.winner)
            })

            f_l.ws.on("ball:vertical:bounce", (data, callback) => {
                callback({
                    status: 'ok'
                })
                const dir = data.dir == 1 ? f_l.game_inf.pitch_h - ball_size : 0
                const from_ = 0 + (data.pos * (f_l.game_inf.pitch_h - ball_size))
                //console.log("v_bounce from ", from_, "to ", dir,
                //"duration :", data.dur, "pos", data.pos)
                f_l.b_apiy.start({
                    from: { y: from_ },
                    to: { y: dir },
                    config: {
                        duration: data.dur
                    }
                })
            })

            f_l.ws.on("ball:horizontal:bounce", (data, callback) => {
                callback({
                    status: 'ok'
                })
                const dir = data.dir == 1 ? f_l.game_inf.pitch_w - ball_size : 0
                const from_ = data.dir == 1 ? 0 : f_l.game_inf.pitch_w - ball_size
                //console.log("h_bounce from ", from_, "to " , dir, 
                //"duration :", data.dur)

                f_l.b_apix.start({
                    from: { x: from_ },
                    to: { x: dir },
                    config: {
                        duration: data.dur
                    }
                })
            })

            f_l.ws.on("ball:first_ping", (data, callback) => {
                callback({
                    status: 'ok'
                })
                console.log("first ping ", data.h_dur, data.v_dur)
                console.log("max_size ==> ", f_l.game_inf.max_y, " ball_size ==> ", ball_size, "border size ==> ", border_size)
                console.log("pitch_h ==>", f_l.game_inf.pitch_h)
                f_l.b_apix.start({
                    from: { x: pl_width },
                    to: { x: f_l.game_inf.pitch_w - ball_size },
                    config: {
                        duration: data.h_dur
                    }
                })

                f_l.b_apiy.start({
                    from: { y: border_size },
                    to: { y: f_l.game_inf.pitch_h - ball_size },
                    config: {
                        duration: data.v_dur
                    },
                })
            })
        })
        return () => {
            f_l.ws.off("ball:first_ping")
            f_l.ws.off("opponent_found")
            f_l.ws.off("ball:horizontal:bounce")
            f_l.ws.off("salat")
            f_l.ws.off("ball:vertical:bounce")
        }
    }, [])


    return (
        <Whoami.Provider value={who_val}>
            {
                ingame === false ?
                    (
                        <p className="w-30 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
                            Waiting for chi 3do ykon khsiiim
                        </p>
                    ) :
                    <CountDown>
                        {children}
                    </CountDown>
            }
        </Whoami.Provider>
    );

}
