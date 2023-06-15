package de.neuefische.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
public class MapService {
    @Value("${map_Token}")
    private String token;
    public String getToken() {
        return token;
    }
}
