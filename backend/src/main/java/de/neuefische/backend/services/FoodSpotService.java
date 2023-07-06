package de.neuefische.backend.services;

import de.neuefische.backend.exceptions.NoSuchFoodSpotException;
import de.neuefische.backend.models.FoodSpot;
import de.neuefische.backend.models.FoodSpotDTO;
import de.neuefische.backend.repos.FoodSpotRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FoodSpotService {

    private final FoodSpotRepo foodSpotRepo;
    private final IdService idService;

    public FoodSpot add(FoodSpotDTO newFoodSpot) {
        String uuid = idService.generateId();
        FoodSpot newFoodSpotWithID = new FoodSpot(uuid,
                newFoodSpot.name(),
                newFoodSpot.spaceType(),
                newFoodSpot.allergens(),
                newFoodSpot.placeType(),
                newFoodSpot.position());
        return foodSpotRepo.save(newFoodSpotWithID);
    }

    public List<FoodSpot> list() {
        return foodSpotRepo.findAll();
    }

    public FoodSpot getById(String id) {
        return foodSpotRepo.findById(id).orElseThrow(NoSuchFoodSpotException::new);
    }
}
