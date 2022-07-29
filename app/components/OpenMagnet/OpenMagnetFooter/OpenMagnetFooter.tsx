import { Component } from 'solid-js'
import { getTorrentInfo, windowClose } from '../../../common/Button/ButtonActions'

import Button from '../../../common/Button/Button'
import Wrapper from '../../../common/Wrapper/Wrapper'

type Props = {
    links: () => string
}

const OpenMagnetFooter: Component<Props> = (props) => {
    const {links} = props

    return (
        <Wrapper type='flex-inline-wrapper'>
            <Button type='button-background' action={() => getTorrentInfo(links)}>
                Download
            </Button>
            <Button type='button-background' action={windowClose}>
                Cancel
            </Button>
        </Wrapper>
    )
}

export default OpenMagnetFooter