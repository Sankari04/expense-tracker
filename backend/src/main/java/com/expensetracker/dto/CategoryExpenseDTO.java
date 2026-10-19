package com.expensetracker.dto;

import java.math.BigDecimal;

public class CategoryExpenseDTO {
    private String category;
    private BigDecimal totalAmount;
    private double percentage;

    public CategoryExpenseDTO() {
    }

    public CategoryExpenseDTO(String category, BigDecimal totalAmount) {
        this.category = category;
        this.totalAmount = totalAmount;
    }

    public CategoryExpenseDTO(String category, BigDecimal totalAmount, double percentage) {
        this.category = category;
        this.totalAmount = totalAmount;
        this.percentage = percentage;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
}
