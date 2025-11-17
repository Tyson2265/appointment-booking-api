package com.capitec.booking.dto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Response DTO used to confirm a successful appointment booking.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponseDTO {
    private Long appointmentId;
    private Long branchId;
    private String branchName;
    private String branchAddress;
    private LocalDateTime startTime;
    private String customerName;
    private String customerContact;
    private String confirmationCode; // The simulated confirmation
}
