import { TrackInfo } from "./types"

export default class ClientConnection {
    private static instance: ClientConnection
    private url = "http://localhost:9104"

    private constructor() {}

    public static getInstance(): ClientConnection {
        if (!ClientConnection.instance) {
            ClientConnection.instance = new ClientConnection()
        }

        return ClientConnection.instance
    }

    public async sendTrack(info: TrackInfo): Promise<boolean> {
        const response = await fetch(`${this.url}/extension/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })

        return response.ok
    }
}
