import axios from "axios";
import {FoodSpot} from "../models/FoodSpot";
import {useState} from "react";

export default function useAddFoodSpot() {
    const [foodSpot, setFoodSpot] = useState<FoodSpot[]>([])

    function addFoodSpot(newFoodSpot: FoodSpot): Promise<void> {
        return axios.post("/food-spots/add-spot", newFoodSpot)
            .then(response =>
                setFoodSpot([...foodSpot, response.data]))
    }

    return {foodSpot, addFoodSpot}
}
