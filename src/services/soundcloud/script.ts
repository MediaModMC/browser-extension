import ClientConnection from "../../core/ClientConnection"
import getTrackInfo from "./getTrackInfo"

ClientConnection.getInstance().bind(getTrackInfo)
