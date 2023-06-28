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
    const [zoom, setZoom] = useState(5.2);

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
        map.current?.addControl(new mapboxgl.GeolocateControl({
            positionOptions:{
                enableHighAccuracy:true,
            }
        }))
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
            <Box style={{width: '100%', height: '93vh', display: 'flex', flexDirection: 'column'}}>
                <Box style={{margin: '5px'}} ref={mapContainer} flex={1}/>
            </Box>
        </div>
    )
}
