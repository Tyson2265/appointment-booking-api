package com.capitec.booking.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Represents a confirmed appointment booking by a customer.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slot_id", nullable = false)
    private Slot slot;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerContact; // Phone number or Email

    // Simulated confirmation (production-grade requirement)
    @Column(unique = true, nullable = false)
    private String confirmationCode;
}
