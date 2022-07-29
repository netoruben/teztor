import { onMount, ParentComponent } from 'solid-js'
import './NavBar.less'

const NavBar: ParentComponent = (props) => {
    return (
        <nav>
            {props.children}
        </nav>
    )
}

export default NavBar