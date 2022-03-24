import { TrackInfo } from "./types"
import { getTrackInfo } from "../services/soundcloud/util"

export default class ClientConnection {
    private static instance: ClientConnection
    private static url = "ws://localhost:9104"

    private socket: WebSocket
    private token: string | null
    private trackFunction: (() => TrackInfo | null) | null

    private constructor() {
        this.socket = new WebSocket(ClientConnection.url)
        this.token = null
        this.trackFunction = null

        this.socket.onopen = () => this.onOpen()
        this.socket.onclose = () => this.onClose()
        this.socket.onmessage = (event) => this.onMessage(event)
    }

    public static getInstance(): ClientConnection {
        if (!ClientConnection.instance)
            ClientConnection.instance = new ClientConnection()

        return ClientConnection.instance
    }

    public bind(func: (() => TrackInfo | null)) {
        this.trackFunction = func
    }

    private onOpen() {
        console.log("Connection opened with MediaMod client!")
        this.sendMessage("HANDSHAKE", null)
    }

    // noinspection JSMethodCanBeStatic
    private onClose() {
        console.warn("Connection closed by the MediaMod client!")
        this.token = null

        // TODO: Attempt to reconnect every 3 seconds
    }

    private onMessage(event: MessageEvent) {
        const message = JSON.parse(event.data)
        console.log(`Received message: ${JSON.stringify(message)}`)

        switch (message.id) {
            case "HANDSHAKE":
                console.log("Received handshake from MediaMod client!")

                this.token = message.data.token
                this.sendMessage("HEARTBEAT", null)
                break
            case "HEARTBEAT":
                setTimeout(() => {
                    this.sendMessage("HEARTBEAT", null)
                }, 500)

                break
            case "TRACK":
                const track = getTrackInfo?.()
                this.sendMessage("TRACK", { track, nonce: message.data.nonce })

                break
            default:
                console.log(`Message received (${message.id}): ${message.data}`)
                break
        }
    }

    private sendMessage(id: string, data: Object | null) {
        if (this.socket.readyState != WebSocket.OPEN) return
        if (this.token == null && id != "HANDSHAKE") return

        this.socket.send(JSON.stringify({ id: id, data: data, token: this.token }))
    }
}
