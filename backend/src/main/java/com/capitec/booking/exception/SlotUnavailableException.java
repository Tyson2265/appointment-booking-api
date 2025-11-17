package com.capitec.booking.exception;

/**
 * Custom exception for when a booking attempt fails because the slot is already taken.
 * This will map to an HTTP 400 Bad Request response.
 */
public class SlotUnavailableException extends RuntimeException {
    public SlotUnavailableException(String message) {
        super(message);
    }
}
