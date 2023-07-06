package de.neuefische.backend.controllers;

import de.neuefische.backend.models.FoodSpot;
import de.neuefische.backend.models.FoodSpotDTO;
import de.neuefische.backend.services.FoodSpotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("food-spots")
@RequiredArgsConstructor
public class FoodSpotController {
    private final FoodSpotService foodSpotService;

    @PostMapping("/add-spot")
    public FoodSpot addSpot(@RequestBody FoodSpotDTO newFoodSpot) {
        return foodSpotService.add(newFoodSpot);
    }

    @GetMapping("/allFoodSpots")
    public ResponseEntity<List<FoodSpot>> listSpots() {
        return new ResponseEntity<>(foodSpotService.list(), HttpStatus.OK);
    }

    @GetMapping("/allFoodSpots/{id}")
    public ResponseEntity<FoodSpot> byId(@PathVariable String id) {
        return new ResponseEntity<>(foodSpotService.getById(id), HttpStatus.OK);
    }
}
