-- ===================================================
-- Expense Tracker Database Setup Script
-- Database: MySQL
-- ===================================================

-- 1. Create the Database if it does not already exist
CREATE DATABASE IF NOT EXISTS expense_tracker;

-- 2. Select and switch to the database
USE expense_tracker;

-- 3. Drop existing table if restarting from clean state (optional)
DROP TABLE IF EXISTS transactions;

-- 4. Create the transactions table
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    transaction_date DATE NOT NULL,
    type VARCHAR(20) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Insert starter sample records
INSERT INTO transactions (amount, category, transaction_date, type, description) VALUES
(50000.00, 'Salary', '2026-10-01', 'INCOME', 'Monthly Salary'),
(450.50, 'Food', '2026-10-03', 'EXPENSE', 'Grocery shopping at supermarket'),
(120.00, 'Travel', '2026-10-05', 'EXPENSE', 'Metro and cab fares'),
(1500.00, 'Shopping', '2026-10-08', 'EXPENSE', 'New running shoes'),
(3500.00, 'Education', '2026-10-10', 'EXPENSE', 'Online certification course fee'),
(800.00, 'Food', '2026-10-12', 'EXPENSE', 'Dinner with friends'),
(5000.00, 'Others', '2026-10-15', 'INCOME', 'Freelance consulting work'),
(650.00, 'Travel', '2026-10-17', 'EXPENSE', 'Weekend train ticket');

-- 6. Verify inserted data
SELECT * FROM transactions ORDER BY transaction_date DESC;
