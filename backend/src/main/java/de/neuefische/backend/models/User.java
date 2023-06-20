package de.neuefische.backend.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@AllArgsConstructor
@Data
@NoArgsConstructor
@Document("users")
public class User {

    private String id;
    private String username;
    private String email;
    private String password;
    private String firstname;
    private String lastname;

}