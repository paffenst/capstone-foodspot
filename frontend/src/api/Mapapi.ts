import axios from "axios";

export function getTokenMap(){
    return axios.get("/api/mapbox")
        .then(response => response.data)
        .catch(console.error)
}
