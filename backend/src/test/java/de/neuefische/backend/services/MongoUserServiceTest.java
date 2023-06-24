package de.neuefische.backend.services;

import de.neuefische.backend.exceptions.UserNotFoundException;
import de.neuefische.backend.models.MongoUser;
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