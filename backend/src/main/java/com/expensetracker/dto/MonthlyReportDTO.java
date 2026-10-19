package com.expensetracker.dto;

import java.math.BigDecimal;

public class MonthlyReportDTO {
    private String month;
    private BigDecimal income;
    private BigDecimal expense;
    private BigDecimal netSavings;

    public MonthlyReportDTO() {
        this.income = BigDecimal.ZERO;
        this.expense = BigDecimal.ZERO;
        this.netSavings = BigDecimal.ZERO;
    }

    public MonthlyReportDTO(String month, BigDecimal income, BigDecimal expense, BigDecimal netSavings) {
        this.month = month;
        this.income = income;
        this.expense = expense;
        this.netSavings = netSavings;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public BigDecimal getIncome() {
        return income;
    }

    public void setIncome(BigDecimal income) {
        this.income = income;
    }

    public BigDecimal getExpense() {
        return expense;
    }

    public void setExpense(BigDecimal expense) {
        this.expense = expense;
    }

    public BigDecimal getNetSavings() {
        return netSavings;
    }

    public void setNetSavings(BigDecimal netSavings) {
        this.netSavings = netSavings;
    }
}
