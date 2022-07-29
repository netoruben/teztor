import { Component, createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import '../../common/style.less'

import OpenMagnetNavBar from './OpenMagnetNavBar/OpenMagnetBavBar'
import OpenMagnetFooter from './OpenMagnetFooter/OpenMagnetFooter'
import OpenMagnetMain from './OpenMagnetMain/OpenMagnetMain'
import Wrapper from '../../common/Wrapper/Wrapper'

const OpenMagnet: Component = () => {
    const [ links, setLinks ] = createSignal('')

    return (
        <>
            <OpenMagnetNavBar/>
            <Wrapper type='max-wrapper'>
                <OpenMagnetMain setLinks={setLinks}/>
                <OpenMagnetFooter links={links}/>
            </Wrapper>
        </>
    )
}

render(() => <OpenMagnet/>, document.body)

export default OpenMagnet