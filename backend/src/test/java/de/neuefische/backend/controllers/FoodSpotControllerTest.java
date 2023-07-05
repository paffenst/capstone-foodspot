package de.neuefische.backend.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class FoodSpotControllerTest {
    @Autowired
    private MockMvc mvc;
    private final String endPoint = "/api/food-spots";

    @Test
    void listSpots_expect_emptyList() throws Exception {
        mvc.perform(get(endPoint))
                .andExpect(status().isNotFound());
    }

    @Test
    void byId_expect_404() throws Exception {
        mvc.perform(get(endPoint + "/0"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    void add_newFoodSpot() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/food-spots/add-spot")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                    "name": "Luis",
                                    "spaceType": [
                                    "indoor",
                                    "outdoor"
                                    ],
                                   "allergens": [
                                   "gluten-free",
                                   "lactose-free"
                                   ],
                                "placeType": "restaurant",
                                "position": {
                                 "latitude": 40.395896078534406,
                                 "longitude": -3.701188626205294
                                    }
                                    }
                                   """
                        ).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content()
                        .json("""
                                    {
                                    "name": "Luis",
                                    "spaceType": [
                                    "indoor",
                                    "outdoor"
                                    ],
                                   "allergens": [
                                   "gluten-free",
                                   "lactose-free"
                                   ],
                                "placeType": "restaurant",
                                "position": {
                                 "latitude": 40.395896078534406,
                                 "longitude": -3.701188626205294
                                    }
                                    }
                                   """
                        )).andExpect(jsonPath("$.id").isNotEmpty());
    }
}