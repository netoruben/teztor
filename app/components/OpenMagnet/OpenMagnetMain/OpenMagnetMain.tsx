import { Component } from 'solid-js'

import TextArea from '../../../common/TextArea/TextArea'

type Props = {
    setLinks: (value: string) => string
}

const OpenMagnetMain: Component<Props> = (props) => {
    const {setLinks} = props

    return (
        <TextArea type='textarea textarea-max' placeholder='One link per line...' onInput={setLinks}/>
    )
}

export default OpenMagnetMain