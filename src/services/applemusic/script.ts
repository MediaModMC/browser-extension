import ClientConnection from "../../core/ClientConnection"
import { getTrackInfo } from "./util"

ClientConnection.getInstance().bind(getTrackInfo)
