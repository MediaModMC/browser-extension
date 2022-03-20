import { getTrackInfo } from "./util"
import ClientConnection from "../../core/ClientConnection"

async function sendData() {
    const info = getTrackInfo()
    if (!info) return

    try {
        await ClientConnection.getInstance().sendTrack(info)
    } catch (e) {
        console.error("Failed to send track information to the MediaMod client!")
    }

    setTimeout(sendData, 1500)
}

sendData().then(() => {})
