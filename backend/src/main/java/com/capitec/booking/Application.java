package com.capitec.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        System.out.println("\n--- Appointment Booking API is running on http://localhost:8080 ---");
        System.out.println("Test Endpoints:");
        System.out.println("GET /api/branches");
        System.out.println("GET /api/slots?branchId=1&date=2025-11-18");
        System.out.println("POST /api/appointments{confirmationCode}--Get Appointment by Confirmation Code");
        System.out.println("------------------------------------------------------------------\n");
    }

}
