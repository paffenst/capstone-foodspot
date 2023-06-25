package de.neuefische.backend.services;


import de.neuefische.backend.models.MongoUser;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EncodePassBCryptEncoderService {
    PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    public String encodedPassword(MongoUser newUser) {
        return encoder.encode(newUser.getPassword());
    }
}