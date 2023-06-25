package de.neuefische.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
     private String id;
     private String username;
     private String email;
     private String firstname;
     private String lastname;
}
