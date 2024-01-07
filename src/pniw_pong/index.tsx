import { useEffect, useReducer, useRef, useState } from "react";
import MyBall from "./Ball.jsx"
import Player from "./player.jsx"
import Border from "./Borders.jsx";
import { useSpring} from '@react-spring/web'
import "./index.css"
import FrontEndLogic from "./front_end_logic.jsx";
import { createContext } from 'react';

export const Whoami = createContext(0)

function PlagrounReducer(state, action) {
    return {
        max_x: action.max_x,
        calculated: action.calculated,
        max_y: action.max_y,
        ball_size: action.ball_size,
        border_size: action.border_size,
        pl_h: action.pl_h,
        pl_w: action.pl_w,
        pitch_h: action.pitch_h,
        pitch_w: action.pitch_w,

        min_x: state.min_x,
        min_y: state.min_y,
        connected: state.connected
    }
}

// todo move the component to another
export const GameShell = () => {

    const [game_inf, game_inf_dispatch] = useReducer(PlagrounReducer, {
        max_x: 0,
        min_x: 0,
        max_y: 0,
        min_y: 0,
        ball_size: 35,
        calculated: false,
        connected: false,
        border_size: 0,
        pl_h: 0,
        pl_w: 0,
        pitch_w: 0,
        pitch_h: 0
    })


    const [bind_l, set_bind_l] = useState(0)

    const [bind_r, set_bind_r] = useState(0)

    const myComponentRef = useRef({});

    useEffect(() => {
        //todo fixing dimensions
        let m_width = myComponentRef.current.offsetWidth
        let m_height = myComponentRef.current.offsetHeight
        let border_size = m_height * 0.015
        let pl_w = 0.01 * m_width
        let pitch_h = (m_height - (2 * border_size))
        let pitch_w = (m_width - (2 * pl_w))

        game_inf_dispatch({
            max_x: m_width,
            max_y: m_height,
            calculated: true,
            ball_size: 0.038043478 * pitch_h,
            border_size: border_size,
            pl_h: 0.15 * m_height,
            pl_w: pl_w,
            pitch_h: pitch_h,
            pitch_w: pitch_w
        })
        console.log("inside : width", game_inf.max_x, " height: ", game_inf.max_y)
    }, [])

    const [spring_l, api_l] = useSpring(() => ({ y: 10 }))
    const [spring_r, api_r] = useSpring(() => ({ y: 10 }))


    const [x_traj, b_apix] = useSpring(() => ({
        x: 0,
        config: {
            duration: 4973
        },
    }))

    const [y_traj, b_apiy] = useSpring(() => ({
        y: 0,
        config: {
            duration: 1500,
        },
        onRest: () => {
            console.log("stoped")
            console.log("y ==> ", y_traj.y.get())
        }
    }));

    if (game_inf.calculated === false) {
        console.log("waaalooo")
        return (
            <div className="content" id="pingpong_playground" ref={myComponentRef}>
                <Border p={1} />
                <Border p={0} />
            </div>
        );
    }

    //console.log("ok now rendered height :", game_inf.max_y)
    else {
        const front_logic = {
            b_apix: b_apix,
            b_apiy: b_apiy,
            x_traj: x_traj,
            y_traj: y_traj,
            game_inf: game_inf,
            ws: {}
        }
        //console.log("content: ", game_inf.ball_size)
        return (
            <div className="content" id="pingpong_playground" ref={myComponentRef}>
                <FrontEndLogic f_l={front_logic}>
                    <MyBall x_traj={x_traj} y_traj={y_traj} size={game_inf.ball_size} />
                    <Player b_s={game_inf.border_size} anim_val={spring_l} api={api_l} side={1} height={game_inf.max_y} />
                    <Player b_s={game_inf.border_size} anim_val={spring_r} api={api_r} side={2} height={game_inf.max_y} />
                    <Border p={1} />
                    <Border p={0} />
                </FrontEndLogic>
            </div>
        )
    }
};
