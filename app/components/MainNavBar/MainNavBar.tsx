import { Component } from 'solid-js'
import useToggleBoolean from '../../hooks/useToggleBoolean'
import { closeSVG, magnetSVG, maximizeSVG, minimizeSVG, openSVG, restoreSVG, torrentSVG } from '../../common/Button/ButtonSVG'
import { windowClose, windowCreate, windowMaximize, windowMinimize, windowRestore } from '../../common/Button/ButtonActions'

import Button from '../../common/Button/Button'
import NavBar from '../../common/NavBar/NavBar'
import NavBarTitle from '../../common/NavBar/NavBarTitle'
import Dropdown from '../../common/Dropdown/Dropdown'
import DropdownItem from '../../common/Dropdown/DropdownItem'
import Wrapper from '../../common/Wrapper/Wrapper'

const MainNavBar: Component = () => {
    const { status: maximized, toggleStatus: toggleMaximize } = useToggleBoolean()
    let draggable: HTMLHeadingElement

    const MaximizeOrUnmaximize = () => {
        switch(maximized()) {
            case true:
                nw.Window.get().once('restore', toggleMaximize)
                return <Wrapper type='nav-buttons'><Button type='nav-button' action={windowRestore}>{restoreSVG}</Button></Wrapper>
            default:
                nw.Window.get().once('maximize', toggleMaximize)
                return <Wrapper type='nav-buttons'><Button type='nav-button'  action={windowMaximize}>{maximizeSVG}</Button></Wrapper>
        }
    }

    return (
        <NavBar>
            <Dropdown type='dropdown-wrapper dropdown-wrapper-first' svg={openSVG} name='Open'>
                <DropdownItem type='dropdown-item dropdown-item-first' action={() => {}}>
                    {torrentSVG}
                    Torrent File
                </DropdownItem>
                <DropdownItem type='dropdown-item' action={() => windowCreate('openMagnet', 'Download From Torrent Links', () => draggable)}>
                    {magnetSVG}
                    Torrent Link
                </DropdownItem>
            </Dropdown>
            <NavBarTitle type='nav-title' ref={draggable}>
                {nw.Window.get().title}
            </NavBarTitle>
            <Wrapper type='nav-buttons'>
                <Button type='nav-button' action={windowMinimize}>
                    {minimizeSVG}
                </Button>
            </Wrapper>
            {MaximizeOrUnmaximize()}
            <Wrapper type='nav-buttons'>
                <Button type='nav-button nav-button-close' action={windowClose}>
                    {closeSVG}
                </Button>
            </Wrapper>
        </NavBar>
    )
}

export default MainNavBar