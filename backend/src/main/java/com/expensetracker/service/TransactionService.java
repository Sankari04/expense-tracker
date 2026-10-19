package com.expensetracker.service;

import com.expensetracker.dto.CategoryExpenseDTO;
import com.expensetracker.dto.DashboardSummaryDTO;
import com.expensetracker.dto.MonthlyReportDTO;
import com.expensetracker.model.Transaction;

import java.time.LocalDate;
import java.util.List;

public interface TransactionService {

    List<Transaction> getAllTransactions();

    List<Transaction> getFilteredTransactions(String type, String category, LocalDate startDate, LocalDate endDate);

    Transaction getTransactionById(Long id);

    Transaction createTransaction(Transaction transaction);

    Transaction updateTransaction(Long id, Transaction transaction);

    void deleteTransaction(Long id);

    DashboardSummaryDTO getDashboardSummary();

    List<CategoryExpenseDTO> getCategoryExpenseSummary();

    List<MonthlyReportDTO> getMonthlyReport();

    List<String> getCategories();
}
