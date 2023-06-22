package com.revature.services;

import com.revature.daos.PersonDAO;
import com.revature.daos.ReimbursementDAO;
import com.revature.daos.StatusDAO;
import com.revature.exceptions.PersonNotFoundException;
import com.revature.exceptions.ReimbursementNotFoundException;
import com.revature.models.Person;
import com.revature.models.Reimbursement;
import com.revature.models.Status;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {
    private final PersonDAO personDao;
    private final ReimbursementDAO reimbursementDAO;
    private final StatusDAO statusDAO;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public PersonService(PersonDAO personDao, ReimbursementDAO reimbursementDAO, StatusDAO statusDAO) {
        this.personDao = personDao;
        this.reimbursementDAO = reimbursementDAO;
        this.statusDAO = statusDAO;
    }

    public Person createPerson(Person t){
        Person returnedPerson = personDao.save(t);

        if (returnedPerson.getId() > 0){
            logger.info("User created");
        } else{
            logger.warn("Failed to create User");
        }

        return returnedPerson;
    }

    public List<Person> getAllPeople(){
        return personDao.findAll();
    }

    // Read One
    public Person getPersonById(int id){
        // We'll use the optional methods to return the proper thing
        return personDao.findById(id).orElseThrow(() -> new PersonNotFoundException("No person found with id: " + id));
    }

    public Person findPersonByUsername(String username) {
        return personDao.findByUsername(username).orElseThrow(() -> new PersonNotFoundException("No person found with username: " + username));
    }

    public Person updatePerson(Person t){
        return personDao.save(t);
    }

    public boolean deletePersonById(int id){
        // We need to delete by id then verify nonexistence
        personDao.deleteById(id);

        // We need to check to see if the teacher is still in the db
        if (!personDao.existsById(id)){
            // Successful message
            return true;
        } else{
            return false;
        }
    }


}
