package com.expensetracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExpenseTrackerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExpenseTrackerApplication.class, args);
        System.out.println("==================================================");
        System.out.println(" Expense Tracker Backend is Running Successfully! ");
        System.out.println(" API Base URL: http://localhost:8080/api/transactions ");
        System.out.println("==================================================");
    }
}
