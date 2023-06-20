package com.revature.controllers;

import com.revature.models.Person;
import com.revature.models.Reimbursement;
import com.revature.security.JwtGenerator;
import com.revature.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class PersonController {

    private final PersonService personService;
    private final JwtGenerator jwtGenerator;

    @Autowired
    public PersonController(PersonService personService, JwtGenerator jwtGenerator) {
        this.personService = personService;
        this.jwtGenerator = jwtGenerator;
    }

    @GetMapping
    public List<Person> getAllPeopleHandler(){

        return personService.getAllPeople();
    }

    // Get One
    @GetMapping("{id}") // /users/id
    public Person getPersonByIdHandler(@PathVariable("id") int id){

        return personService.getPersonById(id);
    }

    // Insert
    // We pass in the person as the body of the post request
    @PostMapping
    public Person createPersonHandler(@RequestBody Person p){

        return personService.createPerson(p);
    }

    // Update
    @PutMapping
    public Person updatePersonHandler(@RequestBody Person p){

        return personService.updatePerson(p);
    }

    // Delete
    @DeleteMapping("{id}")
    public boolean deletePersonHandler(@PathVariable("id") int id){

        return personService.deletePersonById(id);
    }

    @GetMapping("{id}/reimbursements")
    public List<Reimbursement> getReimbursementsFromPersonHandler(@PathVariable("id") int id) {
        return personService.getReimbursementByPersonId(id);
    }

    @PostMapping("reimbursements/{rid}/register/{pid}")
    public ResponseEntity<?> createReimbursementHandler(@PathVariable("pid") int pid, @PathVariable("rid") int rid, @RequestHeader("Authorization") String bearerToken) {
        String username = jwtGenerator.getUsernameFromToken(bearerToken.substring(7));
        Person p = personService.findPersonByUsername(username);

        if (p.getId() == pid) {
            return new ResponseEntity<Person>(personService.createReimbursement(pid, rid), HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("You cannot access another user's records", HttpStatus.FORBIDDEN);
        }
    }

    @DeleteMapping("reimbursements/{rid}/register/{pid}")
    public Person deleteReimbursementHandler(@PathVariable("pid") int pid, @PathVariable("rid") int rid) {
        return personService.deleteReimbursement(pid, rid);
    }
}
