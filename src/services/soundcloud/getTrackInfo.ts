import { getFirstElement, getProgressDuration, getProgressElapsed } from "../../utils/dom"
import { TrackInfo } from "../../core/types"

const classes = {
    album_art: "sc-artwork sc-artwork-4x image__full g-opacity-transition",
    artist: "playbackSoundBadge__lightLink sc-link-light sc-link-secondary sc-truncate sc-text-h5",
    title: "playbackSoundBadge__titleLink sc-truncate sc-text-h5 sc-link-primary",
    progress_bar: "playbackTimeline__progressWrapper sc-mx-1x",
    play_button: "playControl sc-ir playControls__control playControls__play"
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

function isPaused(): boolean {
    const element = getFirstElement(classes.play_button)
    if (!element) return true

    return !element.classList.contains("playing")
}

export default function getTrackInfo(): TrackInfo | null {
    const title = getLinkTitle(classes.title) ?? "Unknown title"
    const artist = getLinkTitle(classes.artist) ?? "Unknown artist"
    const album_art = getAlbumArt()
    const elapsed = getProgressElapsed(classes.progress_bar) ?? 0
    const duration = getProgressDuration(classes.progress_bar) ?? 0
    const paused = isPaused()

    return { title, artist, album_art, timestamps: { duration, elapsed }, paused }
}
