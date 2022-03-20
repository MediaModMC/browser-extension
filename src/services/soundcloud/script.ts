import { getTrackInfo } from "./util"

function getData() {
    console.log(`Data: ${JSON.stringify(getTrackInfo())}`)
    setTimeout(getData, 3000)
}

getData()
