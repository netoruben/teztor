import { WebSocket as Aria2WebSocket } from 'libaria2-ts'
import bencode from 'bencode'
import sha1 from 'js-sha1'

const options = {
    host: 'localhost',
    port: 6800,
    secure: false,
    secret: '',
    path: '/jsonrpc',
}

const aria2 = new Aria2WebSocket.Client({...options})

nw.Window.get().on('close', async () => {
    if (nw.Window.get().title === 'TezTor')
        await aria2.shutdown()
    nw.Window.get().hide()
    nw.Window.get().close(true)
})

export const windowClose = async () => {
    nw.Window.get().close()
}

export const windowMinimize = () => {
    nw.Window.get().minimize()
}

export const windowMaximize = () => {
    nw.Window.get().maximize()
}

export const windowRestore = () => {
    nw.Window.get().restore()
}

export const windowCreate = (type: 'openMagnet' | 'openTorrent', title: string, draggable: () => HTMLHeadingElement, index?: number) => {
    const newWindowOptions = {
        title: title,
        frame: false,
        focus: true,
        width: 600,
        height: 300,
        always_on_top: true,
        min_width: 300,
        min_height: 200
    }

    draggable().className += ' drag-disabled'

    nw.Window.open('./app/views/' + type + '.html', newWindowOptions, (win) => {
        const stopPropagation = (event: MouseEvent) => {
            event.stopPropagation()
            win.hide()
            win.show()
        }

        document.addEventListener('click', stopPropagation, true)

        win.once('close', () => {
            draggable().className = 'nav-title'
            document.removeEventListener('click', stopPropagation, true)
            nw.Window.get().resizeBy(1,1)
            nw.Window.get().resizeBy(-1,-1)
        })

        if (type === 'openTorrent') {
            const torrentMetadata = JSON.parse(window.localStorage.getItem('torrentMetadata'))
            window.localStorage.setItem(win.cWindow.id.toString(), JSON.stringify(torrentMetadata[index]))
        }
    })
}

export const getTorrentFile = async (event: HTMLInputElement, draggable: () => HTMLHeadingElement) => {
    let torrentMetadata  = []
    for(let i = 0; i < event.files.length; i++) {
        const file = event.files.item(i)
        const torrentInfo = bencode.decode(Buffer.from(await file.arrayBuffer()))
        const infohash = sha1(bencode.encode(torrentInfo.info))
        const torrent = bencode.decode(Buffer.from(await file.arrayBuffer()), 'utf8')
        torrent.info.infoHash = infohash
        delete torrent.info.pieces
        torrentMetadata.push(torrent)
        if (event.files.length === torrentMetadata.length) {
            window.localStorage.setItem('torrentMetadata', JSON.stringify(torrentMetadata))
            for(let i = 0; i < event.files.length; i++) {
                windowCreate('openTorrent', 'Torrent Status', draggable, i)
            }
        }
    }
}

export const getTorrentMetadata = async (links: () => string) => {
    const splitLinks = links().split('\n')
    const torrentMetadata = []
    splitLinks.forEach(async (link) => {
        const torrentFile = await aria2.addUri(link, { dir: nw.App.dataPath + '\\blob_storage', 'pause-metadata': true})
        torrentMetadata.push({ magnet: link, torrentGID: torrentFile })
        if (splitLinks.length === torrentMetadata.length) {
            await aria2.close()
            nw.Window.get().close()
            window.localStorage.setItem('torrentMetadata', JSON.stringify(torrentMetadata))
        }
    })

}

export const getTorrent = (torrentGID: string, setStatus: (value) => void) => {
    const timer = setInterval(async () => {
        const torrent = await aria2.tellStatus(torrentGID)
        setStatus(await aria2.tellStatus(torrentGID))
        if (torrent.status === 'complete') {
            console.log(await aria2.tellWaiting(0, 1000))
            setStatus(await aria2.tellStatus(torrent.followedBy[0]))
            await aria2.remove(torrent.followedBy[0])
            console.log(await aria2.tellWaiting(0, 1000))
            // await aria2.remove(torrent.gid)
            clearInterval(timer)
        }
    }, 1000)
    
}