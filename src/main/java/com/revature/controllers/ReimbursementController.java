package com.revature.controllers;

import com.revature.daos.PersonDAO;
import com.revature.daos.ReimbursementDAO;
import com.revature.daos.StatusDAO;
import com.revature.models.Person;
import com.revature.models.Reimbursement;
import com.revature.models.Status;
import com.revature.security.JwtGenerator;
import com.revature.services.PersonService;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("reimbursements")
public class ReimbursementController {
    private final ReimbursementService reimbursementService;
    private final StatusDAO statusDAO;

    private final ReimbursementDAO reimbursementDAO;
    private final PersonDAO personDAO;
    private final PersonService personService;
    private final JwtGenerator jwtGenerator;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService, StatusDAO statusDAO, ReimbursementDAO reimbursementDAO, PersonDAO personDAO, PersonService personService, JwtGenerator jwtGenerator) {
        this.reimbursementService = reimbursementService;
        this.statusDAO = statusDAO;
        this.reimbursementDAO = reimbursementDAO;
        this.personDAO = personDAO;
        this.personService = personService;
        this.jwtGenerator = jwtGenerator;
    }


    @GetMapping
    public List<Reimbursement> getAllReimbursementsHandler(@RequestParam(name = "search", required = false) String searchPattern) {

        if (searchPattern != null) {
            return reimbursementService.searchReimbursements(searchPattern);
        }

        return reimbursementService.getAllReimbursements();
    }

    @GetMapping("/pending")
    public List<Reimbursement> getAllPendingReimbursementsHandler() {
        return reimbursementService.getAllPendingReimbursements();
    }

    @GetMapping("{id}")
    public Reimbursement findReimbursementByIdHandler(@PathVariable("id") int id) {
        return reimbursementService.findReimbursementById(id);
    }

    @GetMapping("/user/{id}")
    public List<Reimbursement> getReimbursementsByPersonId(@PathVariable("id") int id) {
        return reimbursementService.getReimbursementsByPerson(id);
    }

    @PostMapping
    public Reimbursement createReimbursementHandler(@RequestBody Reimbursement r, @RequestHeader("Authorization") String bearerToken){
        Status status = statusDAO.getByName("Pending");

        String username = jwtGenerator.getUsernameFromToken(bearerToken.substring(7));
        Person p = personService.findPersonByUsername(username);

        r.setStatus(status);
        r.setPerson(p);
        return reimbursementService.addReimbursement(r);
    }

    @PutMapping
    public Reimbursement updateReimbursementHandler(@RequestBody Reimbursement r) {
        return reimbursementService.updateReimbursement(r);
    }

    @PutMapping("{id}/approve")
    public boolean approveReimbursementHandler(@PathVariable("id") int id) {
        return reimbursementService.approveReimbursement(id);
    }

    @PutMapping("{id}/deny")
    public boolean denyReimbursementHandler(@PathVariable("id") int id) {
        return reimbursementService.denyReimbursement(id);
    }

    @DeleteMapping("{id}")
    public boolean deleteReimbursementHandler(@PathVariable("id") int id) {
        return reimbursementService.deleteReimbursement(id);
    }
}
