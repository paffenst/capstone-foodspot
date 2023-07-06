package de.neuefische.backend.services;

import de.neuefische.backend.models.MongoUser;
import de.neuefische.backend.models.UserDTO;
import de.neuefische.backend.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MongoUserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final IdService idService;
    private final EncodePassBCryptEncoderService cryptEncoderService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = userRepo.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));
        return new User(mongoUser.getUsername(), mongoUser.getPassword(), List.of());
    }

    public UserDTO registerUser(MongoUser newUser) {
        String uuid = idService.generateId();
        String cryptedPassword = cryptEncoderService.encodedPassword(newUser);
        String username = newUser.getUsername();

        if (userRepo.findUserByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exist");
        }

        MongoUser mongoUser = new MongoUser(uuid, newUser.getUsername(), newUser.getEmail(), cryptedPassword, newUser.getFirstname(), newUser.getLastname(), newUser.getCreatedFoodSpots());
        userRepo.save(mongoUser);
        return new UserDTO(newUser.getId(), newUser.getUsername(), newUser.getEmail(), newUser.getFirstname(), newUser.getLastname());
    }
}