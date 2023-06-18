package com.revature.models;

import org.springframework.context.annotation.Role;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Entity
@Table(name="users")
public class Person {
    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

    @ManyToOne
    private Role role;

    @Column(unique = true)
    private String username;

    private String password;

    @OneToMany
    private String reimbursements;

    public Person() {
    }

    public Person(int id, String firstname, String lastname, Role role, String username, String password, String reimbursements) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.username = username;
        this.password = password;
        this.reimbursements = reimbursements;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getReimbursements() {
        return reimbursements;
    }

    public void setReimbursements(String reimbursements) {
        this.reimbursements = reimbursements;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", role=" + role +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", reimbursements='" + reimbursements + '\'' +
                '}';
    }
}
