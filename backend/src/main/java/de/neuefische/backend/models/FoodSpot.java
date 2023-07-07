package de.neuefische.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("foodspot")
public record FoodSpot(@Id String id,
                       String name,
                       List<String> spaceType,
                       List<String> allergens,
                       String placeType,
                       Foodlocation position) {
}
