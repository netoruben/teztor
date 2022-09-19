import { Component } from 'solid-js'
import './Input.less'

type Props = {
    id: string,
    type: string,
    inputType: string,
    action: (event: HTMLInputElement, draggable: () => HTMLHeadingElement) => void,
    draggable?: () => HTMLHeadingElement,
    multiple?: boolean
}

const Input: Component<Props> = (props) => {
    const { type, id, inputType, multiple, action, draggable } = props

    return (
        <input id={id} type={inputType} class={type} multiple={multiple} onchange={(event) => action(event.currentTarget, draggable)}/>
    )
}

export default Input