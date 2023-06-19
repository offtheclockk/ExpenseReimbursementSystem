package com.revature.services;

import com.revature.daos.PersonDAO;
import com.revature.exceptions.PersonNotFoundException;
import com.revature.models.Person;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonDAO personDao;

    public PersonService(PersonDAO personDao) {
        this.personDao = personDao;
    }

    public Person createPerson(Person t){
        // Now let's call the DAO methods to actually create the teacher
        Person returnedPerson = personDao.save(t);

        // If successful we should have a positive Id
        if (returnedPerson.getId() > 0){
            // TODO create a log for success
        } else{
            // TODO create a log for failure
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
