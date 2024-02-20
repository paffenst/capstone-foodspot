import axios from "axios";

export function getTokenMap() {
    const apiUrl = "/api/mapbox";
    console.log("Request URL:", apiUrl);

    return axios.get(apiUrl)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching Mapbox token:", error);
            throw error;
        });
}