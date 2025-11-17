package com.capitec.booking.dto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * Response DTO used to return available time slot details.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SlotResponseDTO {
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long branchId;
}
