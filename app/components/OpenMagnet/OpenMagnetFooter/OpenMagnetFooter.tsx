import { Component } from 'solid-js'
import { getTorrentMetadata, windowClose } from '../../../common/Button/ButtonActions'

import Button from '../../../common/Button/Button'
import Wrapper from '../../../common/Wrapper/Wrapper'

type Props = {
    links: () => string
}

const OpenMagnetFooter: Component<Props> = (props) => {
    const {links} = props

    return (
        <Wrapper type='flex-inline-wrapper'>
            <Button type='button-background' action={() => getTorrentMetadata(links)}>
                Download
            </Button>
            <Button type='button-background' action={windowClose}>
                Cancel
            </Button>
        </Wrapper>
    )
}

export default OpenMagnetFooter