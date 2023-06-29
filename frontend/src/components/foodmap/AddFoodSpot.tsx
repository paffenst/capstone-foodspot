import React, {ChangeEvent, useEffect, useState} from 'react';
import {FoodSpot} from "../../models/FoodSpot";
import {Foodlocation} from "../../models/Foodlocation";

import {allergens, spaceType} from "../../models/FoodData";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import MySelect from "../../map-ui/MySelect";

type AddFoodSpotProps = {
    markedLocation: Foodlocation
    handleCancel(): void
    handleSave(newFoodSpot: FoodSpot): void
}
export default function AddFoodSpot(props: AddFoodSpotProps) {
    const initailFoodSpot: FoodSpot = {
        id: "",
        name: "",
        placeType: "",
        spaceType: [],
        allergens: [],
        position: props.markedLocation
    }
    const [newFoodSpot, setNewFoodSpot] = useState<FoodSpot>(initailFoodSpot);

    useEffect(() => {
        setNewFoodSpot({...newFoodSpot, position: props.markedLocation})
    })

    function handleSave() {
        props.handleSave(newFoodSpot)
    }

    function handleCancel() {
        props.handleCancel();
    }

    function handleInputChange(event: SelectChangeEvent<string[]>
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | Event) {
        if (event.target) {
            // @ts-ignore
            setNewFoodSpot({...newFoodSpot, [event.target.name]: event.target.value})
        }
    }

    return (

        <Box flexWrap={"wrap"}
             display={"flex"}
             justifyContent={"space-between"}
             alignItems={"center"}
             flexDirection={"column"}>
            <Typography textAlign={"center"} variant={"h5"}>Create your food spot</Typography>
            <Box
                component={"form"}
                noValidate
                flexWrap={"wrap"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDirection={"column"}
                width={"80%"}
            >
                <List>
                    <ListItem>
                        <FormControl fullWidth={true} margin={"dense"}>
                            <TextField name={"name"} type={"text"} label={"food spot name"}
                                       onChange={handleInputChange}/>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl>
                            <FormLabel>Place type:</FormLabel>
                            <RadioGroup
                                defaultValue="restaurant"
                                name="placeType"
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="restaurant" control={<Radio/>} label="Restaurant"/>
                                <FormControlLabel value="bar" control={<Radio/>} label="Bar"/>
                                <FormControlLabel value="bakery" control={<Radio/>} label="Bakery"/>
                                <FormControlLabel value="coffee" control={<Radio/>} label="Coffee"/>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <MySelect
                            required={true}
                            fieldName={"spaceType"}
                            selectedValue={newFoodSpot.spaceType}
                            data={spaceType}
                            label={"Space"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>
                    <ListItem>
                        <MySelect
                            required={true}
                            fieldName={"allergens"}
                            selectedValue={newFoodSpot.allergens}
                            data={allergens}
                            label={"Allergens"}
                            handleSelectChange={handleInputChange}
                        />
                    </ListItem>
                </List>
                <Box sx={{m: 1}}
                     display={"flex"}
                     justifyContent={"space-between"}
                     alignItems={"center"}
                     flexDirection={"row"}>
                    <Button style={{color: "black", backgroundColor: "lightgreen"}} onClick={handleSave}>Save</Button>
                    <Button style={{color: "black", backgroundColor: "red"}} onClick={handleCancel}>Close</Button>
                </Box>
            </Box>
        </Box>)
}
