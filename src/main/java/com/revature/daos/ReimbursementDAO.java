package com.revature.daos;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {

    List<Reimbursement> findByNameContainingIgnoreCase(String pattern);

    @Query("SELECT r FROM Reimbursement r WHERE r.person.id = :id")
    List<Reimbursement> getReimbursementsByPerson(@Param("id") int id);

    @Query("SELECT r FROM Reimbursement r JOIN Status s ON r.status = s.id WHERE s.name = 'Pending'")
    List<Reimbursement> getAllPendingReimbursements();

    @Query("UPDATE Reimbursement r SET r.status = 2 WHERE r.id = :id")
    boolean approveReimbursement(@Param("id") int id);

    @Query("UPDATE Reimbursement r SET r.status = 3 WHERE r.id = :id")
    boolean denyReimbursement(@Param("id") int id);


}
