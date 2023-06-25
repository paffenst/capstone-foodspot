package de.neuefische.backend.services;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MapServiceTest {

    MapService mapboxService = new MapService();

    @Test
    void getToken_expect_environment_token() {
        String expectedToken = System.getenv("map_Token");
        String result = mapboxService.getToken();

        assertEquals(expectedToken, result);
    }
}