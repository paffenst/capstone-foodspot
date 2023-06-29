package de.neuefische.backend.controllers;

import de.neuefische.backend.models.FoodSpot;
import de.neuefische.backend.models.FoodSpotDTO;
import de.neuefische.backend.services.FoodSpotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("food-spots")
@RequiredArgsConstructor
public class FoodSpotController {
    private final FoodSpotService foodSpotService;

    @PostMapping("/add-spot")
    public FoodSpot addSpot(@RequestBody FoodSpotDTO newFoodSpot) {
        return foodSpotService.add(newFoodSpot);
    }
}
