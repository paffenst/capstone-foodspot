import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import {Box} from '@mui/material';

type MapProps = {
    token: string
}

export default function Map(props: MapProps) {
    mapboxgl.accessToken = props.token

    const mapContainer = useRef<HTMLDivElement | string>("");
    const map = useRef<mapboxgl.Map>();
    const [longitude, setLongitude] = useState(10.4515);
    const [latitude, setLatitude] = useState(51.1657);
    const [zoom, setZoom] = useState(4.5);

    useEffect(() => {
        if (props.token === "") return;
        if (map.current) return;
        map.current = new mapboxgl.Map({
            attributionControl: false,
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [longitude, latitude],
            zoom: zoom,
            minZoom: 3
        });
    });

    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            if (map.current) {
                setLongitude(parseFloat(map.current?.getCenter().lng.toFixed(3)));
                setLatitude(parseFloat(map.current?.getCenter().lat.toFixed(3)));
                setZoom(parseFloat(map.current?.getZoom().toFixed(2)));
            }
        });
    });
    return (
        <div>
            <Box style={{width: '100vh', height: '60vh', display: 'flex', flexDirection: 'column'}}>
                <Box ref={mapContainer} flex={1}/>
            </Box>
        </div>
    )
}
