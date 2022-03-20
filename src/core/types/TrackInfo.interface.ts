export interface TrackInfo {
    title: string
    artist: string
    album_art: string | null
    timestamps: {
        duration: number
        elapsed: number
    }
    paused: boolean
}
