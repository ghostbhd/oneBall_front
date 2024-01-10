import { Fragment, useEffect, useRef, useState } from "react"
import { useSocket } from "../Socketio"
import { GetHeaders } from "../jwt_token"
import * as jwtDecode from "jwt-decode";
import { Whoami } from "./index.jsx";
import { useNavigate } from "react-router-dom";


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

export default function FrontEndLogic({ children, f_l, game_inf }) {

    const [ingame, setingame] = useState(false)
    const [requested, setrequested] = useState(false)

    const [who_val, setwho_val] = useState()

    f_l.ws = useSocket()

    let ball_size = game_inf.ball_size
    let border_size = game_inf.border_size
    let pl_width = game_inf.pl_w

    const token = GetHeaders().jwttt;
    const currentUserToken = jwtDecode.jwtDecode(token);
    let salat = useRef(false)
    const nav = useNavigate()

    console.log("rerendered heeere !!! and pitch_w=", game_inf.pitch_w, "and max_x", game_inf.max_x)

    useEffect(() => {
        f_l.ws.emit("lija_bsmlah", { playerID: currentUserToken.id })
        //f_l.ws.on("opponent_found", (data, callback) => {
        f_l.ws.on("opponent_found", (data) => {
            /*
            callback({
                status: 'ok'
            })
            */
            console.log("opponent_found !!")
            setwho_val(data)
            if (ingame === false) {
                setingame(true)
            }
            else {
                console.log("wtfff")
            }
            f_l.ws.on("salat", (data) => {
                salat.current = true
                nav("/games")
                f_l.b_apiy.pause()
                f_l.b_apix.pause()
                console.log("winner winner chicken dinner ", data)
            })
        })

        //f_l.ws.on("ball:horizontal:bounce", (data, callback) => {
        f_l.ws.on("ball:horizontal:bounce", (data) => {
            /*
            callback({
                status: 'ok'
            })
                */
            const dir = data.dir == 1 ? game_inf.pitch_w - ball_size : 0
            const from_ = data.dir == 1 ? 0 : game_inf.pitch_w - ball_size
            //console.log("h_bounce from ", from_, "to " , dir, 
            //"duration :", data.dur)
            //console.log("stop point should be==> ", game_inf.pitch_w - ball_size, " ball_size ==> ")

            f_l.b_apix.start({
                from: { x: from_ },
                to: { x: dir },
                config: {
                    duration: data.dur
                }
            })
        })

        ///f_l.ws.on("ball:first_ping", (data, callback) => {
        f_l.ws.on("ball:first_ping", (data) => {
            /*
            callback({
                status: 'ok'
            })
                */
            /*
            console.log("first ping ", data.h_dur, data.v_dur)
            console.log("max_size ==> ", game_inf.max_y, " ball_size ==> ", ball_size, "border size ==> ", border_size)
            */
            f_l.b_apix.start({
                from: { x: pl_width },
                to: { x: game_inf.pitch_w - ball_size },
                config: {
                    duration: data.h_dur
                }
            })

            f_l.b_apiy.start({
                from: { y: border_size },
                to: { y: game_inf.pitch_h - ball_size },
                config: {
                    duration: data.v_dur
                },
            })
        })

        ///f_l.ws.on("ball:vertical:bounce", (data, callback) => {
        f_l.ws.on("ball:vertical:bounce", (data) => {
            /*
            callback({
                status: 'ok'
            })
                */
            const dir = data.dir == 1 ? game_inf.pitch_h - ball_size : 0
            const from_ = 0 + (data.pos * (game_inf.pitch_h - ball_size))
            //console.log("v_bounce from ", from_, "to ", dir,
            //"duration :", data.dur, "pos", data.pos)
            //console.log("stop point should be==> ", game_inf.pitch_w - ball_size)

            f_l.b_apiy.start({
                from: { y: from_ },
                to: { y: dir },
                config: {
                    duration: data.dur
                }
            })

        })

        return () => {
            f_l.ws.off("ball:first_ping")
            f_l.ws.off("opponent_found")
            f_l.ws.off("ball:horizontal:bounce")
            //f_l.ws.off("salat")
            f_l.ws.off("ball:vertical:bounce")
            if (salat.current !== true) {
                if (ingame === true) {
                    f_l.ws.emit("iquit", { id: currentUserToken.id })
                    console.log("iquit emited")
                }
                else
                    f_l.ws.emit("thala", { id: currentUserToken.id })
            }
        }
    }, [game_inf, nav, ingame])


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
