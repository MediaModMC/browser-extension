import { getTrackInfo } from "./util"
import ClientConnection from "../../core/ClientConnection"

ClientConnection.getInstance().bind(getTrackInfo)
