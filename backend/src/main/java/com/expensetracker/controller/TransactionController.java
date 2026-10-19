package com.expensetracker.controller;

import com.expensetracker.dto.CategoryExpenseDTO;
import com.expensetracker.dto.DashboardSummaryDTO;
import com.expensetracker.dto.MonthlyReportDTO;
import com.expensetracker.model.Transaction;
import com.expensetracker.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"})
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    // 1. Get all transactions (with optional filters)
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        if (type != null || category != null || startDate != null || endDate != null) {
            return ResponseEntity.ok(transactionService.getFilteredTransactions(type, category, startDate, endDate));
        }
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    // 2. Get transaction by ID
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

    // 3. Create a new transaction
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@Valid @RequestBody Transaction transaction) {
        Transaction saved = transactionService.createTransaction(transaction);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // 4. Update an existing transaction
    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody Transaction transactionDetails) {
        Transaction updated = transactionService.updateTransaction(id, transactionDetails);
        return ResponseEntity.ok(updated);
    }

    // 5. Delete a transaction
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        response.put("message", "Transaction deleted successfully with ID: " + id);
        return ResponseEntity.ok(response);
    }

    // 6. Get dashboard summary (Total Income, Total Expense, Balance)
    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {
        return ResponseEntity.ok(transactionService.getDashboardSummary());
    }

    // 7. Get category expense breakdown
    @GetMapping("/category-summary")
    public ResponseEntity<List<CategoryExpenseDTO>> getCategoryExpenseSummary() {
        return ResponseEntity.ok(transactionService.getCategoryExpenseSummary());
    }

    // 8. Get monthly income vs expense summary
    @GetMapping("/monthly-summary")
    public ResponseEntity<List<MonthlyReportDTO>> getMonthlySummary() {
        return ResponseEntity.ok(transactionService.getMonthlyReport());
    }

    // 9. Get list of all categories
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(transactionService.getCategories());
    }
}
