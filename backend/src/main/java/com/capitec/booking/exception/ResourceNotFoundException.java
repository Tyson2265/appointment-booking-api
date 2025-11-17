package com.capitec.booking.exception;

/**
 * Utility exception for when an entity cannot be found by its ID.
 * This is mapped to HTTP 404 by the controller.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
