package com.capitec.booking.service;

import com.capitec.booking.dto.AppointmentResponseDTO;
import com.capitec.booking.dto.BookingRequestDTO;
import com.capitec.booking.dto.SlotResponseDTO;
import com.capitec.booking.entity.Appointment;
import com.capitec.booking.entity.Branch;
import com.capitec.booking.entity.Slot;
import com.capitec.booking.exception.ResourceNotFoundException;
import com.capitec.booking.exception.SlotUnavailableException;
import com.capitec.booking.repository.AppointmentRepository;
import com.capitec.booking.repository.BranchRepository;
import com.capitec.booking.repository.SlotRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service layer containing the core business logic for appointment management.
 */
@Service
@RequiredArgsConstructor
public class BookingService {

    private final BranchRepository branchRepository;
    private final SlotRepository slotRepository;
    private final AppointmentRepository appointmentRepository;

    /**
     * Retrieves all branches.
     */
    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    /**
     * Retrieves all available time slots for a specific branch and date.
     */
    public List<SlotResponseDTO> getAvailableSlots(Long branchId, LocalDate date) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found with ID: " + branchId));

        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay().minusNanos(1);

        // Fetch only slots that are NOT booked for the specified branch/day
        List<Slot> availableSlots = slotRepository.findAvailableSlotsByBranchAndDate(branchId, startOfDay, endOfDay);

        

        return availableSlots.stream()
                .map(this::convertToSlotResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Core business method to book a slot. Uses transaction and locking to prevent double-booking.
     * @param request The booking details provided by the customer.
     * @return The confirmed appointment details.
     */
    @Transactional
    public AppointmentResponseDTO bookAppointment(BookingRequestDTO request) {
        // 1. Fetch the slot with a PESSIMISTIC WRITE LOCK
        // This prevents other concurrent transactions from modifying or reading this slot
        // until the current transaction completes (either successfully or failed).
        Slot slotToBook = slotRepository.findByIdWithLock(request.getSlotId())
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found with ID: " + request.getSlotId()));

        // 2. Critical Availability Check
        if (slotToBook.getIsBooked()) {
            // This happens if a second transaction got past the initial check, but was blocked by the lock
            // and found the slot booked after acquiring the lock.
            throw new SlotUnavailableException("The selected time slot is no longer available.");
        }

        // 3. Update Slot Status
        slotToBook.setIsBooked(true);
        slotRepository.save(slotToBook);

        // 4. Create Appointment and generate confirmation
        Appointment newAppointment = new Appointment();
        newAppointment.setSlot(slotToBook);
        newAppointment.setCustomerName(request.getCustomerName());
        newAppointment.setCustomerContact(request.getCustomerContact());
        // Simulate a unique confirmation code
        newAppointment.setConfirmationCode("CAP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        newAppointment = appointmentRepository.save(newAppointment);

        // 5. Return Confirmation DTO
        return convertToAppointmentResponseDTO(newAppointment);
    }

    /**
     * Retrieves a booking confirmation by the unique code.
     */
    public AppointmentResponseDTO getAppointmentByCode(String code) {
        Appointment appointment = appointmentRepository.findByConfirmationCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with code: " + code));

        return convertToAppointmentResponseDTO(appointment);
    }

    // --- Private Helper Methods (Mapping) ---

    private SlotResponseDTO convertToSlotResponseDTO(Slot slot) {
        return new SlotResponseDTO(
                slot.getId(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getBranch().getId()
        );
    }

    private AppointmentResponseDTO convertToAppointmentResponseDTO(Appointment appointment) {
        return new AppointmentResponseDTO(
                appointment.getId(),
                appointment.getSlot().getBranch().getId(),
                appointment.getSlot().getBranch().getName(),
                appointment.getSlot().getBranch().getAddress(),
                appointment.getSlot().getStartTime(),
                appointment.getCustomerName(),
                appointment.getCustomerContact(),
                appointment.getConfirmationCode()
        );
    }
}
