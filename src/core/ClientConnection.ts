import { TrackInfo } from "./types"

export default class ClientConnection {
    private static instance: ClientConnection
    private static url = "ws://localhost:9104"

    private socket: WebSocket
    private token: string | null

    private constructor() {
        this.socket = new WebSocket(ClientConnection.url)
        this.token = null

        this.socket.onopen = () => this.onOpen()
        this.socket.onclose = () => this.onClose()
        this.socket.onmessage = (event) => this.onMessage(event)
    }

    public static getInstance(): ClientConnection {
        if (!ClientConnection.instance)
            ClientConnection.instance = new ClientConnection()

        return ClientConnection.instance
    }

    public sendTrack(info: TrackInfo) {
        this.sendMessage("TRACK", info)
    }

    private onOpen() {
        console.log("Connection opened with MediaMod client!")
        this.sendMessage("HANDSHAKE", null)
    }

    // noinspection JSMethodCanBeStatic
    private onClose() {
        console.warn("Connection closed by the MediaMod client!")
    }

    private onMessage(event: MessageEvent) {
        const message = JSON.parse(event.data)

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
