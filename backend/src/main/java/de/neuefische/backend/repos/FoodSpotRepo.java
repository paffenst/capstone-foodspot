package de.neuefische.backend.repos;

import de.neuefische.backend.models.FoodSpot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodSpotRepo extends MongoRepository<FoodSpot, String> {
    List<FoodSpot> findByNameContainingIgnoreCase(String name);

    List<FoodSpot> findByNameContainingIgnoreCaseAndPlaceType(String query, String placeType);
}