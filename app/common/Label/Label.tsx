import { ParentComponent } from "solid-js";

type Props = {
    type: string,
    inputID: string,
    action?: () => void
}

const Label: ParentComponent<Props> = (props) => {
    const { type, inputID, action } = props

    return (
        <label class={type} for={inputID} onclick={action}>
            {props.children}
        </label>
    )
}

export default Label