package de.neuefische.backend;

import de.neuefische.backend.services.MapService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MapServiceTest {

    MapService mapService = new MapService();
    @Test
    void getToken_expect() {
        String expected = System.getenv("mapToken");
        String result = mapService.getToken();
        assertEquals(expected,result);
    }
}