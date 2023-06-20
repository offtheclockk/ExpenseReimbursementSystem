package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.exceptions.ReimbursementNotFoundException;
import com.revature.models.Reimbursement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReimbursementService {
    private final ReimbursementDAO reimbursementDAO;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO) {
        this.reimbursementDAO = reimbursementDAO;
    }

    public Reimbursement addReimbursement(Reimbursement reimbursement) {
        Reimbursement returnedReimbursement = reimbursementDAO.save(reimbursement);

        if (returnedReimbursement.getId() > 0) {
            logger.info("Reimbursement created");
        } else {
            logger.warn("Failed to create Reimbursement");
        }

        return returnedReimbursement;
    }

    public List<Reimbursement> getAllReimbursements() {
        List<Reimbursement> reimbursements = reimbursementDAO.findAll();
        return reimbursements;
    }

    public Reimbursement findReimbursementById(int id) {
        return reimbursementDAO.findById(id).orElseThrow(() -> new ReimbursementNotFoundException("No reimbursement found with id: " + id));
    }

    public Reimbursement updateReimbursement(Reimbursement reimbursement) {
        return reimbursementDAO.save(reimbursement);
    }

    public boolean deleteReimbursement(int id) {
        reimbursementDAO.deleteById(id);

        return !(reimbursementDAO.existsById(id));
    }

    public List<Reimbursement> searchReimbursements(String searchPattern) {
        return reimbursementDAO.findByNameContainingIgnoreCase(searchPattern);
    }
}
