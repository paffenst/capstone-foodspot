package de.neuefische.backend.services;

import de.neuefische.backend.models.User;
import de.neuefische.backend.models.UserDTO;
import de.neuefische.backend.models.UserNoAuth;
import de.neuefische.backend.repos.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MongoUserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final IdService idService;
    private final EncodePassBCryptEncoderService cryptEncoderService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("The user '" + username + "' could not be found."));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), List.of());
    }

    public UserNoAuth registerUser(UserDTO newAuthUser) {
        String uuid = idService.generateId();
        String cryptedPassword = cryptEncoderService.encodedPassword(newAuthUser);
        User newUser = new User(uuid, newAuthUser.getUsername(), newAuthUser.getEmail(), cryptedPassword, newAuthUser.getFirstname(), newAuthUser.getLastname());
        userRepo.save(newUser);
        return new UserNoAuth(newAuthUser.getUsername(), newAuthUser.getEmail(), newAuthUser.getFirstname(), newAuthUser.getLastname());
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

}