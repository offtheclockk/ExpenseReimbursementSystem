package com.revature.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "reimbursements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reimbursement {

    @Id
    @Column(name = "reimb_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(name = "amount")
    private int amount;

    private String description;

    @ManyToOne
    private Status status;

    @ManyToOne
    private Person person;


}
