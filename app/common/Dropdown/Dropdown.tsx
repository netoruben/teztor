import { createContext, JSXElement, onMount, ParentComponent, useContext } from 'solid-js'
import useToggleBoolean from '../../hooks/useToggleBoolean'

import Wrapper from '../Wrapper/Wrapper'
import Button from '../Button/Button'
import DropdownWrapper from './DropdownWrapper'

type Props = {
    svg: JSXElement,
    name: string,
    type: string
}

type Context = {
    opened: () => boolean,
    toggleOpened: () => boolean
}

const { status: opened, toggleStatus: toggleOpened } = useToggleBoolean()
const DropdownContext = createContext<Context>({opened, toggleOpened})
const DropdownProvider = DropdownContext.Provider

const Dropdown: ParentComponent<Props> = (props) => {
    const { svg, name, type } = props
    let navDropdownWrapper: HTMLDivElement

    onMount(() => {
        navDropdownWrapper.addEventListener('mouseenter', () => navDropdownWrapper.firstElementChild.className += ' dropdown-main-hover')
        navDropdownWrapper.addEventListener('mouseleave', () => navDropdownWrapper.firstElementChild.className = navDropdownWrapper.firstElementChild.className.replace(' dropdown-main-hover', ''))
        document.addEventListener('mousedown', (event) => !navDropdownWrapper.contains(event.target as Node) && opened() && toggleOpened())
    })

    return (
        <Wrapper type='nav-dropdown-wrapper' ref={navDropdownWrapper}>
            <Button type='nav-button dropdown-main' action={toggleOpened}>
                {svg}
                {name}
            </Button>
            <DropdownProvider value={{opened, toggleOpened}}>
                <DropdownWrapper type={type}>
                    {props.children}
                </DropdownWrapper>
            </DropdownProvider>
        </Wrapper>
    )
}

export const useDropdownContext = () => useContext(DropdownContext)
export default Dropdown