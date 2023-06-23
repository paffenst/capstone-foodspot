package de.neuefische.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.models.UserDTO;
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
    void registerUser_thenStatus200() throws Exception {
        UserDTO newUser = UserDTO.builder()
                .username("testuser")
                .password("testpass")
                .email("test@test.de")
                .firstname("test")
                .lastname("test")
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
                                "username":"testuser",
                                "email":"test@test.de",
                                "firstname":"test",
                                "lastname":"test"
                            }
                        """));
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
}
