package com.capitec.booking.repository;

import com.capitec.booking.entity.Branch;
import com.capitec.booking.entity.Slot;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {

    @Query("SELECT s FROM Slot s WHERE s.branch.id = :branchId AND s.startTime BETWEEN :start AND :end AND s.isBooked = false")
    List<Slot> findAvailableSlotsByBranchAndDate(@Param("branchId") Long branchId,
                                                 @Param("start") LocalDateTime start,
                                                 @Param("end") LocalDateTime end);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM Slot s WHERE s.id = :id")
    Optional<Slot> findByIdWithLock(@Param("id") Long id);

    boolean existsByBranchAndStartTime(Branch branch, LocalDateTime startTime);
}
