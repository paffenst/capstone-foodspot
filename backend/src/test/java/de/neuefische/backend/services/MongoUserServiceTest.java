package de.neuefische.backend.services;

import de.neuefische.backend.exceptions.UserNotFoundException;
import de.neuefische.backend.models.MongoUser;
import de.neuefische.backend.models.UserDTO;
import de.neuefische.backend.models.UserNoAuth;
import de.neuefische.backend.repos.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

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

        when(userRepo.findUserByUsername("paff")).thenThrow(new UserNotFoundException());

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
        MongoUser userNew = MongoUser.builder()
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

    @DirtiesContext
    @Test
    void loadUserByUsername_returnNewUser() {

        String usernameTest = "test";
        String passTest = "testpass";
        MongoUser testMongoUser = MongoUser.builder()
                .username(usernameTest)
                .password(passTest)
                .build();
        when(userRepo.findUserByUsername(usernameTest)).thenReturn(Optional.ofNullable(testMongoUser));

        UserDetails expectedUserDetails = new User(usernameTest, passTest, List.of());

        // when/then
        UserDetails actualUserDetails = mongoService.loadUserByUsername(usernameTest);
        assertEquals(expectedUserDetails, actualUserDetails);
        verify(userRepo).findUserByUsername(usernameTest);
    }

    @DirtiesContext
    @Test
    void loadUserByUsername_throwsUsernameNotFoundException() {
        // given
        String fakename = "fakeUser";

        when(userRepo.findUserByUsername(fakename)).thenReturn(Optional.empty());

        // when/then
        assertThrows(UsernameNotFoundException.class, () -> mongoService.loadUserByUsername(fakename));
        verify(userRepo).findUserByUsername(fakename);
    }
}