import { animated } from '@react-spring/web'
import { useContext} from 'react'
import { useDrag } from '@use-gesture/react'
import { useSocket } from "../Socketio.jsx";
import { GetHeaders } from "../jwt_token"
import * as jwtDecode from "jwt-decode";
import { Whoami } from "./index.jsx"

export default function Player(pro) {

    const wsocket = useSocket();
    let who = useContext(Whoami)


    let padding = pro.side === 2 ? '99%' : '0%'
    let color = pro.side === 2 ? '#7FFFD4': '#ff6d6d'

    let myHeight = pro.height * 0.15

    let border_height = pro.height * 0.015

    let calc_pitch = pro.height - (border_height * 2)

    //tobe checked for buggies
    const token = GetHeaders().jwttt;
    const currentUserToken = jwtDecode.jwtDecode(token);

    // move the even listeners to the useEffect()


    if (pro.side !== who) {
        //console.log("for me ", who, " different than", pro.side)
        let event = pro.side === 1 ? 'get:left_plr:y' : 'get:right_plr:y'
        //console.log("attaching ", event," to ", pro.side)
        wsocket.on(event, (data) => {
            //console.log("recieved ", event)
            pro.api.start({ y: (data * calc_pitch) + border_height, immediate: true })
        })
        return (
            <animated.div
                style={{
                    touchAction: 'none',
                    position: 'absolute',
                    top: '0%',
                    left: padding,
                    width: '1%',
                    height: '15%',
                    background: color,
                    borderRadius: 8,
                    ...pro.anim_val
                }}
            />
        )
    }


    const bind = useDrag(({ active, movement: [, my],
        offset: [, oy], direction: [xDir], velocity, cancel }) => {
        if (oy >= border_height) {
            if (pro.side == 2) {
                pro.api.start({ y: oy, immediate: true })
                wsocket.emit("post:right_plr:y", { data: (oy - border_height) / calc_pitch, playerID: currentUserToken.id })
                //console.log("post:right_plr:y")
            }
            else {
                wsocket.emit("post:left_plr:y", { data: (oy - border_height) / calc_pitch, playerID: currentUserToken.id })
                //console.log("emitting left")
                pro.api.start({ y: oy, immediate: true })
            }
        }
        else
            cancel()
    }, { bounds: { top: border_height, bottom: pro.height - myHeight - border_height }, axis: 'y' })

    return (
        <animated.div
            {...bind()}
            style={{
                touchAction: 'none',
                position: 'absolute',
                top: '0%',
                left: padding,
                width: '1%',
                height: '15%',
                background: color,
                borderRadius: 8,
                ...pro.anim_val
            }}
        />
    )
}
