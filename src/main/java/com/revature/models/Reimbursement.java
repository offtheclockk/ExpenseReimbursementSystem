package com.revature.models;

import javax.persistence.*;

@Entity
@Table(name = "reimbursements")
public class Reimbursement {

    @Id
    @Column(name = "reimb_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "amount")
    private int amount;

    private String description;

    public Reimbursement() {
    }

    public Reimbursement(int id, int amount, String description) {
        this.id = id;
        this.amount = amount;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "id=" + id +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                '}';
    }
}
