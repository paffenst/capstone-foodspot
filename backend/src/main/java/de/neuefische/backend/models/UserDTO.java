package de.neuefische.backend.models;
import lombok.*;

@AllArgsConstructor
@Getter
public class UserDTO {
     private String username;
     private String email;
     private String firstname;
     private String lastname;
}
