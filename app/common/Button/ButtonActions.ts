export const windowClose = () => {
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

export const windowCreate = (type: 'openMagnet' | 'openTorrent', title: string, draggable: () => HTMLHeadingElement) => {
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

    nw.Window.open('./app/views/' + type + '.html', newWindowOptions, (window) => {
        const stopPropagation = (event: MouseEvent) => {
            event.stopPropagation()
            window.hide()
            window.show()
        }

        document.addEventListener('click', stopPropagation, true)

        window.once('close', () => {
            window.close()
            nw.Window.get().reload()
        })
        
    })
}

export const getTorrentInfo = (links: () => string) => {
    console.log(links())
}