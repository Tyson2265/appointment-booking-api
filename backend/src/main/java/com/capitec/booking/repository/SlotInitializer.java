package com.capitec.booking.repository;

import com.capitec.booking.entity.Branch;
import com.capitec.booking.entity.Slot;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SlotInitializer {

    private final BranchRepository branchRepository;
    private final SlotRepository slotRepository;

    @PostConstruct
    public void initializeSlots() {
        System.out.println("SlotInitializer running...");
        List<Branch> branches = branchRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfDay = now.with(LocalTime.of(8, 0));
        LocalDateTime endOfDay = now.with(LocalTime.of(17, 0));

        for (Branch branch : branches) {
            LocalDateTime slotTime = startOfDay;
            while (!slotTime.isAfter(endOfDay.minusHours(1))) {
                LocalDateTime slotEnd = slotTime.plusHours(1);

                boolean exists = slotRepository.existsByBranchAndStartTime(branch, slotTime);
                if (!exists) {
                    slotRepository.save(Slot.builder()
                            .branch(branch)
                            .startTime(slotTime)
                            .endTime(slotEnd)
                            .isBooked(false)
                            .build());
                }
                slotTime = slotEnd;
            }
        }
    }
}

