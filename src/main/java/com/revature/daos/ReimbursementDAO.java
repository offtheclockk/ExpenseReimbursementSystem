package com.revature.daos;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement,Integer> {

    List<Reimbursement>findByAmountContainingIgnoreCase(int pattern);

    @Query("FROM Reimbursement Where amount LIKE %pattern%")
    List<Reimbursement>findByAmountSearch(@Param("pattern")int pattern);
}
