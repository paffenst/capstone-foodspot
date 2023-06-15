package de.neuefische.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = {"classpath:application.properties"})
class FoodMapControllerTest {

    @Autowired
    private MockMvc ApiMvc;

    @Test
    void getToken_expect_api_and_statusOk() throws Exception {
        String api = "/api/mapbox";
        ApiMvc.perform(get(api))
                .andExpect(status().isOk())
                .andExpect(content().string("fakeToken"));
    }
}
