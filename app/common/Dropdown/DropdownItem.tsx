import { ParentComponent } from 'solid-js'

import Button from '../Button/Button'
import { useDropdownContext } from './Dropdown'

type Props = {
    action: () => void,
    type: string
}

const DropdownItem: ParentComponent<Props> = (props) => {
    const { action, type } = props
    const { toggleOpened } = useDropdownContext()

    return (
        <Button type={type} action={() => {action(); toggleOpened()}}>
            {props.children}
        </Button>
    )
}

export default DropdownItem