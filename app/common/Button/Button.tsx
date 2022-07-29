import { ParentComponent } from 'solid-js'
import './Button.less'

type Props = {
    type: string
    action: () => void
}

const Button: ParentComponent<Props> = (props) => {
    const { action, type } = props

    return (
        <button type='button' class={type} onclick={action}>
            {props.children}
        </button>
    )
}

export default Button