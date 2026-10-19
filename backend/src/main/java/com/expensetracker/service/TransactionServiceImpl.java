package com.expensetracker.service;

import com.expensetracker.dto.CategoryExpenseDTO;
import com.expensetracker.dto.DashboardSummaryDTO;
import com.expensetracker.dto.MonthlyReportDTO;
import com.expensetracker.exception.ResourceNotFoundException;
import com.expensetracker.model.Transaction;
import com.expensetracker.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByTransactionDateDescIdDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getFilteredTransactions(String type, String category, LocalDate startDate, LocalDate endDate) {
        String cleanType = (type != null && !type.trim().isEmpty()) ? type.trim() : null;
        String cleanCategory = (category != null && !category.trim().isEmpty()) ? category.trim() : null;
        return transactionRepository.filterTransactions(cleanType, cleanCategory, startDate, endDate);
    }

    @Override
    @Transactional(readOnly = true)
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));
    }

    @Override
    public Transaction createTransaction(Transaction transaction) {
        // Normalize type to UPPERCASE (INCOME / EXPENSE)
        if (transaction.getType() != null) {
            transaction.setType(transaction.getType().trim().toUpperCase());
        }
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction updateTransaction(Long id, Transaction transactionDetails) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));

        existing.setAmount(transactionDetails.getAmount());
        existing.setCategory(transactionDetails.getCategory());
        existing.setTransactionDate(transactionDetails.getTransactionDate());
        if (transactionDetails.getType() != null) {
            existing.setType(transactionDetails.getType().trim().toUpperCase());
        }
        existing.setDescription(transactionDetails.getDescription());

        return transactionRepository.save(existing);
    }

    @Override
    public void deleteTransaction(Long id) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + id));
        transactionRepository.delete(existing);
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardSummaryDTO getDashboardSummary() {
        BigDecimal totalIncome = transactionRepository.sumAmountByType("INCOME");
        BigDecimal totalExpenses = transactionRepository.sumAmountByType("EXPENSE");

        if (totalIncome == null) totalIncome = BigDecimal.ZERO;
        if (totalExpenses == null) totalExpenses = BigDecimal.ZERO;

        BigDecimal remainingBalance = totalIncome.subtract(totalExpenses);
        long totalCount = transactionRepository.count();

        return new DashboardSummaryDTO(totalIncome, totalExpenses, remainingBalance, totalCount);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryExpenseDTO> getCategoryExpenseSummary() {
        List<Object[]> results = transactionRepository.findExpenseSummaryByCategory();
        BigDecimal totalExpenses = transactionRepository.sumAmountByType("EXPENSE");

        if (totalExpenses == null || totalExpenses.compareTo(BigDecimal.ZERO) == 0) {
            totalExpenses = BigDecimal.ZERO;
        }

        List<CategoryExpenseDTO> dtos = new ArrayList<>();
        for (Object[] row : results) {
            String category = (String) row[0];
            BigDecimal amount = (BigDecimal) row[1];
            double percentage = 0.0;

            if (totalExpenses.compareTo(BigDecimal.ZERO) > 0) {
                percentage = amount.multiply(BigDecimal.valueOf(100))
                        .divide(totalExpenses, 2, RoundingMode.HALF_UP)
                        .doubleValue();
            }

            dtos.add(new CategoryExpenseDTO(category, amount, percentage));
        }

        return dtos;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MonthlyReportDTO> getMonthlyReport() {
        List<Transaction> transactions = transactionRepository.findAll();

        // Group by YearMonth
        Map<YearMonth, List<Transaction>> groupedByMonth = transactions.stream()
                .filter(t -> t.getTransactionDate() != null)
                .collect(Collectors.groupingBy(t -> YearMonth.from(t.getTransactionDate()), TreeMap::new, Collectors.toList()));

        List<MonthlyReportDTO> monthlyReports = new ArrayList<>();
        DateTimeFormatter displayFormatter = DateTimeFormatter.ofPattern("MMM yyyy");

        for (Map.Entry<YearMonth, List<Transaction>> entry : groupedByMonth.entrySet()) {
            YearMonth ym = entry.getKey();
            List<Transaction> monthTxList = entry.getValue();

            BigDecimal income = monthTxList.stream()
                    .filter(t -> "INCOME".equalsIgnoreCase(t.getType()))
                    .map(Transaction::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal expense = monthTxList.stream()
                    .filter(t -> "EXPENSE".equalsIgnoreCase(t.getType()))
                    .map(Transaction::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal savings = income.subtract(expense);

            monthlyReports.add(new MonthlyReportDTO(ym.format(displayFormatter), income, expense, savings));
        }

        return monthlyReports;
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getCategories() {
        Set<String> standardCategories = new LinkedHashSet<>(Arrays.asList(
                "Food", "Travel", "Shopping", "Education", "Salary", "Others"
        ));

        List<String> existingCategories = transactionRepository.findDistinctCategories();
        if (existingCategories != null) {
            standardCategories.addAll(existingCategories);
        }

        return new ArrayList<>(standardCategories);
    }
}
