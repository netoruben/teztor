import { Component, createEffect, onMount } from 'solid-js'
import useToggleBoolean from '../../hooks/useToggleBoolean'
import { closeSVG, magnetSVG, maximizeSVG, minimizeSVG, openSVG, restoreSVG, torrentSVG } from '../../common/Button/ButtonSVG'
import { getTorrent, getTorrentFile, windowClose, windowCreate, windowMaximize, windowMinimize, windowRestore } from '../../common/Button/ButtonActions'

import Button from '../../common/Button/Button'
import NavBar from '../../common/NavBar/NavBar'
import NavBarTitle from '../../common/NavBar/NavBarTitle'
import Dropdown from '../../common/Dropdown/Dropdown'
import DropdownItem from '../../common/Dropdown/DropdownItem'
import Wrapper from '../../common/Wrapper/Wrapper'
import Input from '../../common/Input/Input'
import DropdownLabelItem from '../../common/Dropdown/DropdownLabelItem'

const MainNavBar: Component = () => {
    const { status: maximized, toggleStatus: toggleMaximize } = useToggleBoolean()
    let draggable: HTMLHeadingElement

    onMount(() => {
        window.localStorage.clear()
        window.onstorage = async (event: StorageEvent) => {
            if (event.key === 'torrentMetadata') {
                const torrentMetadata: [] = JSON.parse(window.localStorage.getItem('torrentMetadata'))
                for(let i = 0; i < torrentMetadata.length; i++) {
                    windowCreate('openTorrent', 'Torrent Status', () => draggable, i)
                }
            }
        }
    })

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
                <DropdownLabelItem type='dropdown-item dropdown-item-first' inputID='torrentFile'>
                    {torrentSVG}
                    Torrent File
                </DropdownLabelItem>
                <Input id='torrentFile' inputType='file' type='input-disabled' action={getTorrentFile} draggable={() => draggable} multiple/>
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