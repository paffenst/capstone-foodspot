import React, {useEffect, useRef, useState} from 'react';
import mapboxgl, {LngLatLike} from 'mapbox-gl';
import {Box} from '@mui/material';
import {FoodSpot} from "../../models/FoodSpot";
import {Foodlocation} from "../../models/Foodlocation";

type MapProps = {
    token: string
    centerMarker: mapboxgl.Marker | undefined
    foodSpot: FoodSpot[]
}

export default function Map1(props: MapProps) {
    mapboxgl.accessToken = props.token
    const mapContainer = useRef<HTMLDivElement | string>("");
    const map = useRef<mapboxgl.Map>();
    const [longitude, setLongitude] = useState(10.4515);
    const [latitude, setLatitude] = useState(51.1657);
    const [zoom, setZoom] = useState(5.7);

    useEffect(() => {
        if (props.token === "") return;
        if (props.centerMarker && map.current) {
            props.centerMarker.addTo(map.current)
        }
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
            positionOptions: {
                enableHighAccuracy: true,
            }
        }));


    }, [props.token, props.centerMarker, longitude, latitude, zoom]);


    useEffect(() => {
        if (!map.current) return;
        map.current.on('move', () => {
            if (map.current) {
                setLongitude(parseFloat(map.current.getCenter().lng.toFixed(3)));
                setLatitude(parseFloat(map.current.getCenter().lat.toFixed(3)));
                setZoom(parseFloat(map.current.getZoom().toFixed(2)));

                if (props.centerMarker) {
                    props.centerMarker.setLngLat(map.current?.getCenter())
                }
            }
        });
    }, [props.centerMarker]);

    useEffect(() => {
        if (!map.current) return;
        if (props.foodSpot && props.foodSpot.length > 0) {
            props.foodSpot.forEach((foodspot) => {
                if (map.current) {
                    const {longitude, latitude}: Foodlocation = foodspot.position;
                    const spotPopup = new mapboxgl.Popup({offset: 25, maxWidth: "none"})
                        .setHTML(`<div style="background-size: cover; 
                    background-color: #61dafb">Name: ${foodspot.name} <br> Place: ${foodspot.placeType}</div>`)

                    const lngLat: LngLatLike = [longitude, latitude];
                    new mapboxgl.Marker()
                        .setPopup(spotPopup)
                        .setLngLat(lngLat)
                        .addTo(map.current);
                }
            })
        }
    }, [props.foodSpot])

    return (
        <div>
            <Box style={{width: '100%', height: '93vh', display: 'flex', flexDirection: 'column'}}>
                <Box style={{margin: '5px'}} ref={mapContainer} flex={1}/>
            </Box>
        </div>
    )
}
