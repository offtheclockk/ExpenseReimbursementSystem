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

    @ManyToOne
    private String statuses;

    public Reimbursement() {
    }

    public Reimbursement(int id, int amount, String description, String statuses) {
        this.id = id;
        this.amount = amount;
        this.description = description;
        this.statuses = statuses;
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

    public String getStatuses() {
        return statuses;
    }

    public void setStatuses(String statuses) {
        this.statuses = statuses;
    }

    @Override
    public String toString() {
        return "Reimbursement{" +
                "id=" + id +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", statuses='" + statuses + '\'' +
                '}';
    }
}
