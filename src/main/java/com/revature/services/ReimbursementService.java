package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.StatusDAO;
import com.revature.exceptions.ReimbursementNotFoundException;
import com.revature.models.Reimbursement;
import com.revature.models.Status;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {
    private final ReimbursementDAO reimbursementDAO;

    private final StatusDAO statusDAO;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, StatusDAO statusDAO) {
        this.reimbursementDAO = reimbursementDAO;
        this.statusDAO = statusDAO;
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

    public List<Reimbursement> getReimbursementsByPerson(int pid) {
        return reimbursementDAO.getReimbursementsByPerson(pid);
    }

    public List<Reimbursement> getAllPendingReimbursements() {
        return reimbursementDAO.getAllPendingReimbursements();
    }

    public boolean approveReimbursement(int id) {
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(id);
        Status status = statusDAO.getReferenceById(2);
        if (optionalReimbursement.isPresent()) {
            Reimbursement reimbursement = optionalReimbursement.get();
            System.out.println(reimbursement);
            reimbursement.setStatus(status); // Set the new status value

            reimbursementDAO.save(reimbursement); // Save the modified reimbursement object
        }
        return true;
    }

    public boolean denyReimbursement(int id) {
        Optional<Reimbursement> optionalReimbursement = reimbursementDAO.findById(id);
        Status status = statusDAO.getReferenceById(3);
        if (optionalReimbursement.isPresent()) {
            Reimbursement reimbursement = optionalReimbursement.get();
            System.out.println(reimbursement);
            reimbursement.setStatus(status); // Set the new status value

            reimbursementDAO.save(reimbursement); // Save the modified reimbursement object
        }
        return true;
    }
}