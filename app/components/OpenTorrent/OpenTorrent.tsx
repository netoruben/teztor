import { Component, createEffect, createSignal, onMount } from 'solid-js'
import { render } from 'solid-js/web'
import '../../common/style.less'

import OpenTorrentNavBar from './OpenTorrentNavBar/OpenTorrentBavBar'
import OpenTorrentMain from './OpenTorrentMain/OpenTorrentMain'
import Wrapper from '../../common/Wrapper/Wrapper'
import { getTorrent } from '../../common/Button/ButtonActions'

const OpenTorrent: Component = () => {
    const [status, setStatus] = createSignal()

    const torrentMetadata = JSON.parse(window.localStorage.getItem(nw.Window.get().cWindow.id.toString()))
    if (torrentMetadata.hasOwnProperty('torrentGID')) {
        getTorrent(torrentMetadata.torrentGID, setStatus)
    } else {
        setStatus(torrentMetadata)
    }
    
    createEffect(() => {
        console.log(status())
    })

    // onMount(async () => {
    //     const torrentGID = window.localStorage.getItem('torrentGID')
    //     await getTorrentStatus(torrentGID, setStatus)
    // })

    // createEffect(async () => {
    //     console.log (status())
    //     //console.log(await getTorrentFull(status().infoHash))
    // })
    

    return (
        <>
            <OpenTorrentNavBar/>
            <Wrapper type='max-wrapper'>
                <OpenTorrentMain/>
            </Wrapper>
        </>
    )
}

render(() => <OpenTorrent/>, document.body)

export default OpenTorrent