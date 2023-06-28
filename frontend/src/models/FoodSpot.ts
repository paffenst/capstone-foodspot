import {Foodlocation} from "./Foodlocation";
import {FoodType, Place, Space} from "./FoodData";

export type FoodSpot = {
    id: string;
    name: string;
    placeType: Place[];
    spaceType: Space[];
    allergenic: FoodType[];
    position: Foodlocation
}