package de.neuefische.backend.services;

import de.neuefische.backend.exceptions.NoSuchFoodSpotException;
import de.neuefische.backend.models.FoodSpot;
import de.neuefische.backend.models.FoodSpotDTO;
import de.neuefische.backend.models.Foodlocation;
import de.neuefische.backend.repos.FoodSpotRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FoodSpotServiceTest {
    @Mock
    FoodSpotRepo foodSpotRepo;
    @Mock
    IdService idService;
    @InjectMocks
    private FoodSpotService foodSpotService;


    @Test
    void add_expected_food_spot() {
        FoodSpotDTO foodSpotDTO = new FoodSpotDTO("test", new ArrayList<>(),
                new ArrayList<>(), "test",
                new Foodlocation(50.000, 10.000));

        FoodSpot givenSpot = new FoodSpot("0", "test", new ArrayList<>(),
                new ArrayList<>(), "test",
                new Foodlocation(50.000, 10.000));

        when(foodSpotRepo.save(givenSpot)).thenReturn(givenSpot);
        when(idService.generateId()).thenReturn("0");

        FoodSpot result = foodSpotService.add(foodSpotDTO);

        assertEquals(givenSpot, result);
        verify(foodSpotRepo).save(givenSpot);
    }

    @Test
    void getById_expect_spot() {
        when(foodSpotRepo.findById("12")).thenReturn(Optional.of(new FoodSpot("12", "test", new ArrayList<>(),
                new ArrayList<>(), "test", new Foodlocation(50.000, 10.000))));

        FoodSpot result = foodSpotService.getById("12");

        assertEquals("12", result.id());
    }

    @Test
    void getById_expect_throws_exception() {
        assertThrows(NoSuchFoodSpotException.class, () -> foodSpotService.getById("0"));
        verify(foodSpotRepo).findById("0");
    }
}