import { Component } from 'solid-js'
import './TextArea.less'

type Context = {
    type: string,
    placeholder: string,
    onInput: (value: string) => string
}

const TextArea: Component<Context> = (props) => {
    const { type, placeholder, onInput } = props

    return (
        <textarea class={type} placeholder={placeholder}  oninput={(event) => onInput((event.target as HTMLTextAreaElement).value)}></textarea>
    )
}

export default TextArea