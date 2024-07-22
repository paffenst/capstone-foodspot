package de.neuefische.backend.controllers;

import de.neuefische.backend.services.MapService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/mapbox")
@CrossOrigin(origins = "https://capstone-foodspot.onrender.com/")
public class FoodMapController {
    private final MapService mapService;

    public FoodMapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping
    public String getToken(){
        return mapService.getToken();
    }
}
