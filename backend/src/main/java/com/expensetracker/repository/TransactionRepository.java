package com.expensetracker.repository;

import com.expensetracker.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Retrieve all transactions ordered by most recent date
    List<Transaction> findAllByOrderByTransactionDateDescIdDesc();

    // Filter transactions by optional type, category, and date range
    @Query("SELECT t FROM Transaction t WHERE " +
           "(:type IS NULL OR :type = '' OR LOWER(t.type) = LOWER(:type)) AND " +
           "(:category IS NULL OR :category = '' OR LOWER(t.category) = LOWER(:category)) AND " +
           "(:startDate IS NULL OR t.transactionDate >= :startDate) AND " +
           "(:endDate IS NULL OR t.transactionDate <= :endDate) " +
           "ORDER BY t.transactionDate DESC, t.id DESC")
    List<Transaction> filterTransactions(
            @Param("type") String type,
            @Param("category") String category,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    // Total sum by transaction type (INCOME or EXPENSE)
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE UPPER(t.type) = UPPER(:type)")
    BigDecimal sumAmountByType(@Param("type") String type);

    // Expenses grouped by category
    @Query("SELECT t.category, SUM(t.amount) FROM Transaction t " +
           "WHERE UPPER(t.type) = 'EXPENSE' " +
           "GROUP BY t.category " +
           "ORDER BY SUM(t.amount) DESC")
    List<Object[]> findExpenseSummaryByCategory();

    // Distinct categories used in transactions
    @Query("SELECT DISTINCT t.category FROM Transaction t ORDER BY t.category ASC")
    List<String> findDistinctCategories();
}
