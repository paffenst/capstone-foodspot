import {Foodlocation} from "./Foodlocation";
import {FoodType, Space} from "./FoodData";

export type FoodSpot = {
    id: string;
    name: string;
    placeType: string;
    spaceType: Space[];
    allergens: FoodType[];
    position: Foodlocation
}