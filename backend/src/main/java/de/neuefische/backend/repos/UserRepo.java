package de.neuefische.backend.repos;

import de.neuefische.backend.models.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<MongoUser, String> {
    Optional<MongoUser> findUserByUsername(String username);

}