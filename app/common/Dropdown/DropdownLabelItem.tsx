import { ParentComponent } from 'solid-js'
import Label from '../Label/Label'

import { useDropdownContext } from './Dropdown'

type Props = {
    type: string,
    inputID: string
}

const DropdownLabelItem: ParentComponent<Props> = (props) => {
    const { type, inputID } = props
    const { toggleOpened } = useDropdownContext()

    return (
        <Label type={type} inputID={inputID} action={toggleOpened}>
            {props.children}
        </Label>
    )
}

export default DropdownLabelItem