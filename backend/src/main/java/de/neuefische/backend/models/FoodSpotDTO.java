package de.neuefische.backend.models;

import java.util.List;

public record FoodSpotDTO(String name,
                          List<String> spaceType,
                          List<String> allergens,
                          String placeType,
                          Foodlocation position) {
}