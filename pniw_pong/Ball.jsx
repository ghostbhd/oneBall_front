import { SpringRef, animated, to, useSpring, useSpringRef, useSpringValue, config } from '@react-spring/web'
import { useEffect, useState } from 'react'

export default function MyBall(props) {

    //color = props.ball_color
    console.log("ball:size", props.size)
    return (
        <animated.div
            style={{
                touchAction: 'none',
                position: 'absolute',
                width: props.size,
                height: props.size,
                top : '1.5%',
                left : '1%',
                //background: props.ball_color,
                background: '#ffff00',
                borderRadius: 50,
                ...props.x_traj,
                ...props.y_traj
            }}
        />
    )
}
