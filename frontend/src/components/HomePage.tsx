import React from 'react';
import Map from "../components/foodmap/Map"
import {Box} from "@mui/material";

type HomepageProps = {
    token: string
}
export default function HomePage(props: HomepageProps) {
    return (
        <div>
            <Box >
                <Map token={props.token}/>
            </Box>
        </div>
    )
}
