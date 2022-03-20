const classes = {
    album_art: "sc-artwork sc-artwork-4x sc-artwork-placeholder-10  image__full g-opacity-transition",
    artist: "playbackSoundBadge__lightLink sc-link-light sc-link-secondary sc-truncate sc-text-h5",
    title: "playbackSoundBadge__titleLink sc-truncate sc-text-h5 sc-link-primary"
}

function getFirstElement(classId: string): Element | null {
    const elements = document.getElementsByClassName(classId)
    return elements.item(0)
}

function getAlbumArt(): string | null {
    const element = getFirstElement(classes.album_art)
    if (!element) return null

    // cssValue will be something like ``url("https://i1.sndcdn.com/artworks-1XxkquKhNSWa-0-t50x50.jpg")``, we need to
    // remove the url() and the quotations to get the real value
    const cssValue = window.getComputedStyle(element).backgroundImage
    return cssValue.slice(4, -1).replace(/"/g, "").replace("50x50", "500x500")
}

function getLinkTitle(classID: string): string | null {
    const element = getFirstElement(classID)
    if (!element) return null

    return element.getAttribute("title")
}

function getTitle(): string | null {
    return getLinkTitle(classes.title)
}

function getArtist(): string | null {
    return getLinkTitle(classes.artist)
}

// TODO: Remove this
setTimeout(function doSomething() {
    console.log(`Album art: ${getAlbumArt()}`)
    console.log(`Song: ${getTitle()} by ${getArtist()}`)

    setTimeout(doSomething, 3000)
}, 3000)
