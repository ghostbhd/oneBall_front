import { animated} from '@react-spring/web'
import "./index.css"
import "./k.css"

export default function Border(props) {

    if (props.p == 1)
    {
        return (
            <animated.div className={"border"}
            style={{
                position : 'absolute',
                top : '0%'
            }}
            />
        )
    }

    return (
        <animated.div className={"border"}
        style={{
                position : 'absolute',
                top : '98.5%'
        }}
        />
    )
}
