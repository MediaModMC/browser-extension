import { getFirstElement, getProgressDuration, getProgressElapsed } from "../../utils/dom"
import { TrackInfo } from "../../core/types"

const classes = {
    title: {
        parent: "title style-scope ytd-video-primary-info-renderer", // h1
        child: "style-scope ytd-video-primary-info-renderer" // yt-formatted-string
    },
    artist: "#upload-info div#text-container.ytd-channel-name a",
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

function getArtist(): string | null {
    return document.querySelectorAll(classes.artist)?.item(0)?.textContent
}

function getAlbumArt(): string | null {
    const params = new URLSearchParams(window.location.search)
    if (!params) return null

    const video_id = params.get("v")
    if (!video_id) return null

    return `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`
}

function isPaused(): boolean {
    const play_button = getFirstElement(classes.play_button)
    if (!play_button) return true

    const title_attribute = play_button.getAttribute("title")
    if (!title_attribute) return true

    return title_attribute.toLowerCase().includes("play")
}

export default function getTrackInfo(): TrackInfo | null {
    const title = getFormattedString(classes.title)
    if (!title) return null

    const artist = getArtist()
    if (!artist) return null

    const album_art = getAlbumArt()
    if (!album_art) return null

    const elapsed = getProgressElapsed(classes.progress_bar) ?? 0
    const duration = getProgressDuration(classes.progress_bar) ?? 0
    const paused = isPaused()

    return { title, artist, album_art, timestamps: { duration, elapsed }, paused }
}
