import { getFirstElement, getProgressDuration, getProgressElapsed } from "../../utils/dom"
import { TrackInfo } from "../../core/types"

const classes = {
    album_art: {
        container: "image css-kd2g8l",
        element: "css-1cq49xp"
    },
    artist: {
        container: "artist-link css-12kg1b5",
        element: "css-r22orw"
    },
    title: {
        container: "css-12szxho",
        element: "tidal-ui__text css-1q2au77"
    },
    progress_bar: "progressBarWrapper--BdltI",
    play_button: {
        container: "playbackControlBar",
        parent: "css-1ri6uh9 big"
    }
}

function getElementFromContainer({ container, element }: { container: string, element: string }): Element | null {
    const container_element = getFirstElement(container)
    if (!container_element) return null

    const child_element = container_element.getElementsByClassName(element).item(0)
    if (!child_element) return null

    return child_element
}

function getTitle(): string | null {
    const element = getElementFromContainer(classes.title)
    if (!element) return null

    return element.textContent
}

function getArtist(): string | null {
    const element = getElementFromContainer(classes.artist)
    if (!element) return null

    return element.textContent
}

function getAlbumArt(): string | null {
    const element = getElementFromContainer(classes.album_art) as HTMLImageElement
    if (!element) return null

    const src = element.srcset.split(",")?.pop()?.trim()
    if (!src) return null

    return src.slice(0, src.length - 6)
}

function isPaused(): boolean {
    const container = document.getElementById(classes.play_button.container)
    if (!container) return true

    const parent = container.getElementsByClassName(classes.play_button.parent).item(0)
    if (!parent) return true

    const element = parent.getElementsByTagName("button").item(0)
    if (!element) return true

    return element.title.includes("Play")
}

export default function getTrackInfo(): TrackInfo | null {
    const title = getTitle() ?? "Unknown Title"
    const artist = getArtist() ?? "Unknown Artist"
    const album_art = getAlbumArt()
    const elapsed = getProgressElapsed(classes.progress_bar) ?? 0
    const duration = getProgressDuration(classes.progress_bar) ?? 0
    const paused = isPaused()

    return { title, artist, album_art, timestamps: { duration, elapsed }, paused }
}
