package de.neuefische.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
public class MapService {
    @Value("${mapToken}")
    private String token;

    public String getToken() {
        return token;
    }
}
