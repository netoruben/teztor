import { ParentComponent } from 'solid-js'
import './Dropdown.less'

import { useDropdownContext } from './Dropdown'

type Props = {
    type: string
}

const DropdownWrapper: ParentComponent<Props> = (props) => {
    const { type } = props
    const { opened } = useDropdownContext()

    return (
        <div class={type + (opened() ? ' enabled-grid' : '')}>
            {props.children}
        </div>
    )
}

export default DropdownWrapper