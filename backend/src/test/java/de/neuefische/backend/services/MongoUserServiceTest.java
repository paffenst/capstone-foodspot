package de.neuefische.backend.services;

import de.neuefische.backend.exceptions.UserNotFoundException;
import de.neuefische.backend.models.User;
import de.neuefische.backend.models.UserDTO;
import de.neuefische.backend.models.UserNoAuth;
import de.neuefische.backend.repos.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.DirtiesContext;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class MongoUserServiceTest {

    UserRepo userRepo = mock(UserRepo.class);
    IdService idService = mock(IdService.class);
    EncodePassBCryptEncoderService hashPasswordService = mock(EncodePassBCryptEncoderService.class);
    MongoUserService mongoService = new MongoUserService(userRepo, idService, hashPasswordService);


    @Test
    void loadUserByUsername_expect_MyUsernameNotFoundException() {
        String username = "NoSuchUser";

        when(userRepo.findByUsername("paff")).thenThrow(new UserNotFoundException());

        assertThrows(UsernameNotFoundException.class, () -> {
            mongoService.loadUserByUsername(username);
        });
    }

    @DirtiesContext
    @Test
    void registerUser_returnNewUser() {

        String userTest = "test";
        String idTest = "idtest";
        String passTest = "passtest";
        String hashpass = "hashpass";

        UserDTO newUser = UserDTO.builder()
                .username(userTest)
                .password(passTest)
                .build();
        User userNew = User.builder()
                .id(idTest)
                .username(userTest)
                .password(hashpass)
                .build();

        when(idService.generateId()).thenReturn(idTest);
        when(hashPasswordService.encodedPassword(newUser)).thenReturn(hashpass);
        when(userRepo.save(userNew)).thenReturn(userNew);

        UserNoAuth expectedUser = UserNoAuth.builder()
                .username(userTest)
                .build();
        UserNoAuth actualUser = mongoService.registerUser(newUser);

        //then//when
        assertEquals(expectedUser, actualUser);
        verify(idService).generateId();
        verify(hashPasswordService).encodedPassword(newUser);
        verify(userRepo).save(userNew);

    }
}