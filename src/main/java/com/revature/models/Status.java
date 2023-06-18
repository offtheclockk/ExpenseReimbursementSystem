package com.revature.models;

import javax.persistence.*;

@Entity
@Table(name = "statuses")
public class Status {

    @Id
    @Column(name = "status_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name= "status_name")
    private String statusname;

    public Status() {
    }

    public Status(int id, String statusname) {
        this.id = id;
        this.statusname = statusname;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatusname() {
        return statusname;
    }

    public void setStatusname(String statusname) {
        this.statusname = statusname;
    }

    @Override
    public String toString() {
        return "Status{" +
                "id=" + id +
                ", statusname='" + statusname + '\'' +
                '}';
    }
}
