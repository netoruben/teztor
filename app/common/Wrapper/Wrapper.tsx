import { ParentComponent } from 'solid-js'
import './Wrapper.less'

type Props = {
    type: string,
    ref?: HTMLDivElement
}

const Wrapper: ParentComponent<Props> = (props) => {
    const { type } = props

    return (
        <div ref={props.ref} class={type}>{props.children}</div>
    )
}

export default Wrapper