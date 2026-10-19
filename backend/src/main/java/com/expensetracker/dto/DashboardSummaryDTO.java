package com.expensetracker.dto;

import java.math.BigDecimal;

public class DashboardSummaryDTO {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal remainingBalance;
    private long totalTransactions;

    public DashboardSummaryDTO() {
        this.totalIncome = BigDecimal.ZERO;
        this.totalExpenses = BigDecimal.ZERO;
        this.remainingBalance = BigDecimal.ZERO;
        this.totalTransactions = 0;
    }

    public DashboardSummaryDTO(BigDecimal totalIncome, BigDecimal totalExpenses, BigDecimal remainingBalance, long totalTransactions) {
        this.totalIncome = totalIncome;
        this.totalExpenses = totalExpenses;
        this.remainingBalance = remainingBalance;
        this.totalTransactions = totalTransactions;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(BigDecimal totalIncome) {
        this.totalIncome = totalIncome;
    }

    public BigDecimal getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(BigDecimal totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public BigDecimal getRemainingBalance() {
        return remainingBalance;
    }

    public void setRemainingBalance(BigDecimal remainingBalance) {
        this.remainingBalance = remainingBalance;
    }

    public long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
}
