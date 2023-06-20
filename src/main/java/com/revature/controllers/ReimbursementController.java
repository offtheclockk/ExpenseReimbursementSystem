package com.revature.controllers;

import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("reimbursements")
public class ReimbursementController {
    private final ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @GetMapping
    public List<Reimbursement> getAllReimbursementsHandler(@RequestParam(name = "search", required = false) String searchPattern) {

        if (searchPattern != null) {
            return reimbursementService.searchReimbursements(searchPattern);
        }

        return reimbursementService.getAllReimbursements();
    }

    @GetMapping("{id}")
    public Reimbursement findReimbursementByIdHandler(@PathVariable("id") int id) {
        return reimbursementService.findReimbursementById(id);
    }

    @PostMapping
    public Reimbursement createReimbursementHandler(@RequestBody Reimbursement r) {
        return reimbursementService.addReimbursement(r);
    }

    @PutMapping
    public Reimbursement updateReimbursementHandler(@RequestBody Reimbursement r) {
        return reimbursementService.updateReimbursement(r);
    }

    @DeleteMapping("{id}")
    public boolean deleteReimbursementHandler(@PathVariable("id") int id) {
        return reimbursementService.deleteReimbursement(id);
    }
}
