package de.neuefische.backend.controllers;

import de.neuefische.backend.models.FoodSpot;
import de.neuefische.backend.models.Foodlocation;
import de.neuefische.backend.services.FoodSpotService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class FoodSpotControllerTest {
    @Autowired
    private MockMvc mvc;
    private final String endPoint = "/api/food-spots";
    public FoodSpotService service = mock(FoodSpotService.class);
    private FoodSpotController controller = new FoodSpotController(service);

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

    @Test
    void testFoodSpotLists() {
        // given
        List<FoodSpot> expectedSpots = Arrays.asList(
                new FoodSpot("1", "Wien bar", new ArrayList<>(), new ArrayList<>(), "bar", new Foodlocation(50.000, 10.000)),
                new FoodSpot("2", "Chicago restaurant", new ArrayList<>(), new ArrayList<>(), "restaurant", new Foodlocation(51.000, 11.000))
        );
        when(service.list()).thenReturn(expectedSpots);

        // when
        ResponseEntity<List<FoodSpot>> response = controller.listSpots();

        // then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedSpots, response.getBody());

    }

    @Test
    void test_FoodSpotById() {
        // given
        String Id = "12";
        FoodSpot expectedSpot = new FoodSpot("12", "Chicago bar", new ArrayList<>(),
                new ArrayList<>(), "restaurant", new Foodlocation(51.000, 11.000));
        when(service.getById(Id)).thenReturn(expectedSpot);

        // when
        ResponseEntity<FoodSpot> response = controller.byId(Id);

        // then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedSpot, response.getBody());
    }

}