package de.neuefische.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.models.MongoUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser()
    void registerUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "username": "Test",
                                        "password": "4321"
                                        }
                                        """
                        ).with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "test", password = "testpass")
    void loginUser_thenReturnStatus200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/login")
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("test"));
    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void userLogin_returnStatus200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "username": "Test",
                                        "password": "Test123"
                                        }
                                        """
                        ).with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/login")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void registerUser_thenReturnStatus200() throws Exception {
        MongoUser newUser = MongoUser.builder()
                .username("user1")
                .password("pass1")
                .email("user@test.de")
                .firstname("firstnametest")
                .lastname("lastnametest")
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonRequestBody = objectMapper.writeValueAsString(newUser);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequestBody)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                "username":"user1",
                                "email":"user@test.de",
                                "firstname":"firstnametest",
                                "lastname": "lastnametest"
                            }
                        """));
    }
}
