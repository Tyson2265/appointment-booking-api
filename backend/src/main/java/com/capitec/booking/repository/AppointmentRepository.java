package com.capitec.booking.repository;

import com.capitec.booking.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    /**
     * Finds an appointment using the unique confirmation code.
     */
    Optional<Appointment> findByConfirmationCode(String confirmationCode);
}
