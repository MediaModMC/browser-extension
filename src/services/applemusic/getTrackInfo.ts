import { getFirstElement, getProgressDuration, getProgressElapsed } from "../../utils/dom"
import { TrackInfo } from "../../core/types"

const classes = {
    album_art: "media-artwork-v2 media-artwork-v2--aspect-ratio media-artwork-v2--downloaded media-artwork-v2--no-border media-artwork-v2--chrome-playback web-chrome-playback-lcd__artwork-container",
    artist: {
        parent: "web-chrome-playback-lcd__sub-copy-scroll-inner-text-wrapper",
        child: "ember-view web-chrome-playback-lcd__sub-copy-scroll-link"
    },
    title: "web-chrome-playback-lcd__song-name-scroll-inner-text-wrapper",
    progress_bar: "web-chrome-playback-lcd__scrub",
    play_button: "button-reset web-chrome-playback-controls__playback-btn"
}

function getTitle(): string | null {
    const element = getFirstElement(classes.title)
    if (!element) return null

    const text_content = element.textContent
    if (!text_content) return null

    return text_content.split("\n")[0]
}

function getArtist(): string | null {
    const parent = getFirstElement(classes.artist.parent)
    if (!parent) return null

    const child = parent.getElementsByClassName(classes.artist.child)?.item(0)
    if (!child) return null

    return child.textContent
}

function getAlbumArt(): string | null {
    const element = getFirstElement(classes.album_art)
    if (!element) return null

    const picture_element = element.getElementsByTagName("picture")?.item(0)
    if (!picture_element) return null

    const source_element = picture_element.getElementsByTagName("source")?.item(0)
    if (!source_element) return null

    const src = source_element.srcset.split(",")?.pop()
    if (!src) return null

    return src.replace("88w", "").replace("88x88", "512x512").trim()
}

function isPaused(): boolean {
    const element = document.getElementsByClassName(classes.play_button)?.item(1)
    if (!element) return true

    const aria_label = element.getAttribute("aria-label")
    if (!aria_label) return true

    return aria_label.toLowerCase().includes("play")
}

export default function getTrackInfo(): TrackInfo | null {
    const title = getTitle() ?? "Unknown title"
    const artist = getArtist() ?? "Unknown artist"
    const album_art = getAlbumArt()
    const elapsed = getProgressElapsed(classes.progress_bar) ?? 0
    const duration = getProgressDuration(classes.progress_bar) ?? 0
    const paused = isPaused()

    return { title, artist, album_art, timestamps: { duration, elapsed }, paused }
}
