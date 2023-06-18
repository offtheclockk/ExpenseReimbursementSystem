package com.revature;

import com.revature.models.Person;
import com.revature.models.Role;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExpenseReimbursementSystemApplication {

	public static void main(String[] args) {

		SpringApplication.run(ExpenseReimbursementSystemApplication.class, args);
	}

	Role role = new Role(1, "Admin");

}
