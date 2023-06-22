package de.neuefische.backend.services;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class IdServiceTest {
    @Test
    void generateId_expect_not_empty() {
        IdService idService = new IdService();

        String result = idService.generateId();

        assertFalse(result.isEmpty());
    }
}
