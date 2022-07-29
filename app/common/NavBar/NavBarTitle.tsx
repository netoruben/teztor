import { ParentComponent } from 'solid-js'
import './NavBar.less'

type Props = {
    type: string,
    ref?: HTMLHeadingElement
}

const NavBarTitle: ParentComponent<Props> = (props) => {
    const { type } = props

    return (
        <h1 ref={props.ref} class={type}>
            {props.children}
        </h1>
    )
}

export default NavBarTitle