import { getFirstElement } from "../../utils/dom"
import { TrackInfo } from "../../core/types"

const classes = {
    title: {
        parent: "title style-scope ytd-video-primary-info-renderer", // h1
        child: "style-scope ytd-video-primary-info-renderer" // yt-formatted-string
    },
    artist: {
        parent: "style-scope ytd-channel-name", // yt-formatted-string
        child: "yt-simple-endpoint style-scope yt-formatted-string" // a
    },
    progress_bar: "ytp-progress-bar",
    play_button: "ytp-play-button ytp-button"
}

function getFormattedString(classes: { parent: string; child: string }): string | null {
    const parent = getFirstElement(classes.parent)
    if (!parent) return null

    const child = parent.getElementsByClassName(classes.child)?.item(0)
    if (!child) return null

    return child.textContent
}

function getAlbumArt(): string | null {
    const params = new URLSearchParams(window.location.search)
    if (!params) return null

    const video_id = params.get("v")
    if (!video_id) return null

    return `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`
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

function isPaused(): boolean {
    const play_button = getFirstElement(classes.play_button)
    if (!play_button) return true

    const title_attribute = play_button.getAttribute("title")
    if (!title_attribute) return true

    return title_attribute.toLowerCase().includes("play")
}

export function getTrackInfo(): TrackInfo | null {
    const title = getFormattedString(classes.title)
    if (!title) return null

    const artist = getFormattedString(classes.artist)
    if (!artist) return null

    const album_art = getAlbumArt()
    if (!album_art) return null

    const elapsed = getElapsed() ?? 0
    const duration = getDuration() ?? 0
    const paused = isPaused()

    return { title, artist, album_art, timestamps: { duration, elapsed }, paused }
}
