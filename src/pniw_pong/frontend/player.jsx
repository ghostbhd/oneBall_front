import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'
import { useGesture, useDrag } from '@use-gesture/react'
import { useSocket } from "../../Socketio.jsx";
import { getHeaders } from "../../jwt_token"
import * as jwtDecode from "jwt-decode";

export default function Player(pro) {

    const mycom = useRef()
    let myHeight = pro.height * 0.15

    let border_height = pro.height * 0.015

    let calc_pitch = pro.height - (border_height * 2)

    //tobe checked for buggies
    const token = getHeaders().jwttt;
    const currentUserToken = jwtDecode.jwtDecode(token);
    const wsocket = useSocket();

    const bind = useDrag(({ active, movement: [, my],
        offset: [, oy], direction: [xDir], velocity, cancel }) => {
        if (oy >= border_height) {
            if (pro.side == 2) {
                pro.api.start({ y: oy, immediate: true })
                wsocket.emit("post:right_plr:y", { data: (oy - border_height) / calc_pitch , playerID : currentUserToken.id})
            }
            else {
                wsocket.emit("post:left_plr:y", { data: (oy - border_height) / calc_pitch , playerID : currentUserToken.id})
                console.log("emitting left")
                pro.api.start({ y: oy, immediate: true })
            }
        }
        else
            cancel()
    }, { bounds: { top: border_height, bottom: pro.height - myHeight - border_height }, axis: 'y' })

    if (pro.side == 2) {
        wsocket.on('get:right_plr:y', (data) => {
            pro.api.start({ y: (data * calc_pitch) + border_height, immediate: true })
        })
        return (
            <animated.div
                {...bind()}
                style={{
                    touchAction: 'none',
                    position: 'absolute',
                    top: '0%',
                    left: '99%',
                    width: '1%',
                    height: '15%',
                    background: '#ff6d6d',
                    borderRadius: 8,
                    ...pro.anim_val
                }} ref={mycom}
            />
        )
    }
    else {
        wsocket.on('get:left_plr:y', (data) => {
            pro.api.start({ y: (data * calc_pitch) + border_height, immediate: true })
        })
        return (
            <animated.div
                {...bind()}
                style={{
                    touchAction: 'none',
                    position: 'absolute',
                    left: '0%',
                    top: '0%',
                    width: '1%',
                    height: '15%',
                    background: '#ff6d6d',
                    borderRadius: 8,
                    ...pro.anim_val
                }} ref={mycom}
            />
        )
    }
}
