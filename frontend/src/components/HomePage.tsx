import React, {useEffect, useState} from 'react';
import Map from "../components/foodmap/Map"
import {Box, Drawer, Fab, SpeedDial, SpeedDialAction} from "@mui/material";
import {Foodlocation} from "../models/Foodlocation";
import mapboxgl from "mapbox-gl";
import {Add, FoodBank, LocationOn} from "@mui/icons-material";
import AddFoodSpot from "./foodmap/AddFoodSpot";
import {FoodSpot} from "../models/FoodSpot";
import useAddFoodSpot from "../hooks/useAddFoodSpot";

type HomepageProps = {
    token: string
    handleSaveSpot(newFoodSpot: FoodSpot): Promise<void>
}
export default function HomePage(props: HomepageProps) {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [markedLocation, setMarkedLocation] = useState<Foodlocation>({latitude: 0, longitude: 0})
    const [centerMarker, setCenterMarker] = useState<mapboxgl.Marker>()
    const [hideMarkLocation, setHideMarkLocation] = useState(true)
    const {foodSpot, getFoodSpots} = useAddFoodSpot()
    function handleDrawerClose() {
        setOpenDrawer(false)
    }

    function handleSaveSpot(newFoodSpot: FoodSpot) {
        props.handleSaveSpot(newFoodSpot)
            .then(() => {
                setOpenDrawer(false)
                setHideMarkLocation(false)
                centerMarker?.remove()
                setCenterMarker(undefined)
                getFoodSpots()
                setHideMarkLocation(true)
            })
    }

    function handleCreateCenterMarker() {
        if (!centerMarker) {
            setCenterMarker(new mapboxgl.Marker().setLngLat([0, 0]))
            setHideMarkLocation(false)
        }
    }

    function handleChoosePosition() {
        if (centerMarker?.getLngLat()) {
            setMarkedLocation(
                {
                    ...markedLocation,
                    latitude: centerMarker?.getLngLat().lat,
                    longitude: centerMarker?.getLngLat().lng
                })
            setOpenDrawer(true)
        }
    }

    useEffect(() => {
        getFoodSpots();
    }, [getFoodSpots]);

    return (
        <div>
            <Box>
                <Map centerMarker={centerMarker} token={props.token} foodSpot={foodSpot}/>
                {!hideMarkLocation &&
                    <Fab color={"primary"} variant={"extended"} hidden={true} onClick={handleChoosePosition}
                         sx={{
                             left: 50,
                             position: 'fixed',
                             bottom: 40
                         }}>
                        <FoodBank style={{color: "coral"}} sx={{mr: 1}}/>
                        Mark location
                    </Fab>}
                <SpeedDial
                    ariaLabel={"addFoodSpot"}
                    sx={{
                        right: 50,
                        position: 'fixed',
                        bottom: 40
                    }}
                    icon={<Add/>}
                >
                    <SpeedDialAction key={"chooselocation"}
                                     icon={<LocationOn/>}
                                     tooltipOpen={true}
                                     tooltipTitle={"Mark a position"}
                                     onClick={handleCreateCenterMarker}
                    />
                </SpeedDial>

                <Drawer
                    anchor={"top"}
                    open={openDrawer}>
                    <AddFoodSpot markedLocation={markedLocation} handleCancel={handleDrawerClose}
                                 handleSave={handleSaveSpot}/>
                </Drawer>
            </Box>
        </div>
    )
}
