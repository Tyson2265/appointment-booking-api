package com.capitec.booking.dto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Request DTO used when a customer attempts to book an appointment.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    @NotNull(message = "Slot ID is mandatory")
    private Long slotId;
    
    @NotBlank(message = "Customer name is mandatory")
    private String customerName;
    
    @NotBlank(message = "Contact details (phone/email) are mandatory")
    private String customerContact;
}
