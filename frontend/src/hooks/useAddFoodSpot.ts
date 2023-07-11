import axios from "axios";
import {FoodSpot} from "../models/FoodSpot";
import {useCallback, useEffect, useState} from "react";

export default function useAddFoodSpot() {
    const [foodSpot, setFoodSpot] = useState<FoodSpot[]>([]);

    const getAllFoodSpots = useCallback(() => {
        return axios.get("/food-spots/allFoodSpots").then((response) => response.data);
    }, []);

    const getFoodSpots = useCallback(() => {
        getAllFoodSpots().then((data) => setFoodSpot(data));
    }, [getAllFoodSpots]);

    useEffect(() => {
        getFoodSpots();
    }, [getFoodSpots]);

    function addFoodSpot(newFoodSpot: FoodSpot): Promise<void> {
        return axios
            .post("/food-spots/add-spot", newFoodSpot)
            .then((response) => setFoodSpot([...foodSpot, response.data]));
    }

    return {foodSpot, addFoodSpot, getFoodSpots, setFoodSpot};
}
