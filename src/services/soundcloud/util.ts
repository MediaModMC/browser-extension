import { getFirstElement } from "../../utils/dom"
import { TrackInfo } from "../../core/types"

const classes = {
    album_art: "sc-artwork sc-artwork-4x sc-artwork-placeholder-10  image__full g-opacity-transition",
    artist: "playbackSoundBadge__lightLink sc-link-light sc-link-secondary sc-truncate sc-text-h5",
    title: "playbackSoundBadge__titleLink sc-truncate sc-text-h5 sc-link-primary",
    progress_bar: "playbackTimeline__progressWrapper sc-mx-1x"
}

function getLinkTitle(classID: string): string | null {
    const element = getFirstElement(classID)
    if (!element) return null

    return element.getAttribute("title")
}

function getAlbumArt(): string | null {
    const element = getFirstElement(classes.album_art)
    if (!element) return null

    // cssValue will be something like ``url("https://i1.sndcdn.com/artworks-1XxkquKhNSWa-0-t50x50.jpg")``, we need to
    // remove the url() and the quotations to get the real value
    const cssValue = window.getComputedStyle(element).backgroundImage
    return cssValue.slice(4, -1).replace(/"/g, "").replace("50x50", "500x500")
}

function getDuration(): number | null {
    const element = getFirstElement(classes.progress_bar)
    if (!element) return null

    const valuemax = element.getAttribute("aria-valuemax")
    if (!valuemax) return null

    return parseInt(valuemax) * 1000
}

function getElapsed(): number | null {
    const element = getFirstElement(classes.progress_bar)
    if (!element) return null

    const valuenow = element.getAttribute("aria-valuenow")
    if (!valuenow) return null

    return parseInt(valuenow) * 1000
}

export function getTrackInfo(): TrackInfo | null {
    const title = getLinkTitle(classes.title) ?? "Unknown title"
    const artist = getLinkTitle(classes.artist) ?? "Unknown artist"
    const album_art = getAlbumArt()
    const duration = getDuration() ?? 0
    const elapsed = getElapsed() ?? 0

    return { title, artist, album_art, timestamps: { duration, elapsed } }
}
