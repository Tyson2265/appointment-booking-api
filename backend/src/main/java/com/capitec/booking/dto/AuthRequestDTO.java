// filepath: c:\Users\sipho\OneDrive\Desktop\appointment-booking-api\backend\src\main\java\com\capitec\booking\dto\AuthRequestDTO.java
package com.capitec.booking.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequestDTO {
    private String username;
    private String password;
}