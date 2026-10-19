package com.expensetracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @NotBlank(message = "Category is required")
    @Column(nullable = false, length = 50)
    private String category;

    @NotNull(message = "Transaction date is required")
    @Column(name = "transaction_date", nullable = false)
    private LocalDate transactionDate;

    @NotBlank(message = "Type is required (INCOME or EXPENSE)")
    @Column(nullable = false, length = 20)
    private String type;

    @Column(length = 255)
    private String description;

    // Default constructor for JPA
    public Transaction() {
    }

    // Parameterized constructor
    public Transaction(Long id, BigDecimal amount, String category, LocalDate transactionDate, String type, String description) {
        this.id = id;
        this.amount = amount;
        this.category = category;
        this.transactionDate = transactionDate;
        this.type = type;
        this.description = description;
    }

    // Convenience constructor without ID
    public Transaction(BigDecimal amount, String category, LocalDate transactionDate, String type, String description) {
        this.amount = amount;
        this.category = category;
        this.transactionDate = transactionDate;
        this.type = type;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDate transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", amount=" + amount +
                ", category='" + category + '\'' +
                ", transactionDate=" + transactionDate +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
