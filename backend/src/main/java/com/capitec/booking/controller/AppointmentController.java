package com.capitec.booking.controller;
import com.capitec.booking.dto.AppointmentResponseDTO;
import com.capitec.booking.dto.BookingRequestDTO;
import com.capitec.booking.dto.SlotResponseDTO;
import com.capitec.booking.entity.Branch;
import com.capitec.booking.exception.ResourceNotFoundException;
import com.capitec.booking.exception.SlotUnavailableException;
import com.capitec.booking.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

/**
 * Controller to handle all API requests related to branches, slots, and appointments.
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppointmentController {

    private final BookingService bookingService;

    // --- Branch Endpoints ---

    @GetMapping("/branches")
    public ResponseEntity<List<Branch>> getAllBranches() {
        List<Branch> branches = bookingService.getAllBranches();
        return ResponseEntity.ok(branches);
    }

    // --- Slot Endpoints ---

    @GetMapping("/slots")
    public ResponseEntity<List<SlotResponseDTO>> getAvailableSlots(
            @RequestParam Long branchId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<SlotResponseDTO> slots = bookingService.getAvailableSlots(branchId, date);
            return ResponseEntity.ok(slots);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // --- Appointment Endpoints ---

    @PostMapping("/appointments")
    public ResponseEntity<AppointmentResponseDTO> bookAppointment(@Valid @RequestBody BookingRequestDTO request) {
        try {
            AppointmentResponseDTO response = bookingService.bookAppointment(request);
            // HTTP 201 Created is the appropriate response for resource creation
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (SlotUnavailableException e) {
            // Handle specific business errors gracefully (e.g., slot already taken)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/appointments/{code}")
    public ResponseEntity<AppointmentResponseDTO> getAppointmentByCode(@PathVariable String code) {
        try {
            AppointmentResponseDTO appointment = bookingService.getAppointmentByCode(code);
            return ResponseEntity.ok(appointment);
        } catch (ResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
