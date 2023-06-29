package de.neuefische.backend.repos;

import de.neuefische.backend.models.FoodSpot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodSpotRepo extends MongoRepository<FoodSpot, String> {

}
