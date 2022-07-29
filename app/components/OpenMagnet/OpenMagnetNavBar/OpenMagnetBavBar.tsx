import { Component } from 'solid-js'
import { closeSVG, magnetSVG } from '../../../common/Button/ButtonSVG'
import { windowClose } from '../../../common/Button/ButtonActions'

import NavBar from '../../../common/NavBar/NavBar'
import NavBarTitle from '../../../common/NavBar/NavBarTitle'
import Wrapper from '../../../common/Wrapper/Wrapper'
import Button from '../../../common/Button/Button'

const OpenMagnetNavBar: Component = () => {
    return (
        <NavBar>
            <NavBarTitle type='nav-title nav-title-left'>
                {magnetSVG}
                {nw.Window.get().title}
            </NavBarTitle>
            <Wrapper type='nav-buttons'>
                <Button type='nav-button nav-button-close' action={windowClose}>
                    {closeSVG}
                </Button>
            </Wrapper>
        </NavBar>
    )
}

export default OpenMagnetNavBar