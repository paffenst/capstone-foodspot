import axios from "axios";
import {FoodSpot} from "../models/FoodSpot";
import {useEffect, useState} from "react";

export default function useAddFoodSpot() {
    const [foodSpot, setFoodSpot] = useState<FoodSpot[]>([]);

    useEffect(() => {
        getFoodSpots();
    }, []);

    function addFoodSpot(newFoodSpot: FoodSpot): Promise<void> {
        return axios
            .post("/food-spots/add-spot", newFoodSpot)
            .then((response) => setFoodSpot([...foodSpot, response.data]));
    }

    function getAllFoodSpots(): Promise<FoodSpot[]> {
        return axios.get("/food-spots/allFoodSpots").then((response) => response.data);
    }

    function getFoodSpots(): void {
        getAllFoodSpots().then((data) => setFoodSpot(data));
    }

    return {foodSpot, addFoodSpot, getFoodSpots, setFoodSpot};
}
