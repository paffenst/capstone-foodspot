import React, {useEffect, useRef, useState} from 'react';
import mapboxgl, {LngLatLike} from 'mapbox-gl';
import {Box} from '@mui/material';
import {FoodSpot} from "../../models/FoodSpot";
import {Foodlocation} from "../../models/Foodlocation";
import "./Map.css";
import 'mapbox-gl/dist/mapbox-gl.css';

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


        map.current.on('load', () => {
            map.current?.addLayer({
                id: 'points-of-interest',
                slot: 'middle',
                source: {
                    type: 'vector',
                    url: 'mapbox://mapbox.mapbox-streets-v8'
                },
                'source-layer': 'poi_label',
                type: 'circle'
            });

            map.current?.addLayer({
                id: '3d-buildings',
                source: 'composite',
                'source-layer': 'building',
                filter: ['==', 'extrude', 'true'],
                type: 'fill-extrusion',
                minzoom: 15,
                paint: {
                    'fill-extrusion-color': '#aaa',
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            });
        });

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
                    const spotPopup = new mapboxgl.Popup({
                        offset: 1, maxWidth: "none",
                        className: "custom-popup"
                    })
                        .setHTML(`<div class="custom-popup-content">
                                        Name: ${foodspot.name} <br>
                                        Place: ${foodspot.placeType} <br>
                                        Allergens: ${foodspot.allergens
                            .slice(0, 3)
                            .map(allergen => `<span>${allergen}</span>`)
                            .join(", ")} <br>
                                  </div>`)
                    const markerElement = document.createElement('div');
                    markerElement.className = 'custom-marker';

                    const lngLat: LngLatLike = [longitude, latitude];
                    new mapboxgl.Marker(markerElement)
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