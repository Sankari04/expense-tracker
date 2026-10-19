# 💰 Expense Tracker Web Application

A complete, full-stack **Expense Tracker Web Application** built with **Spring Boot (Java)**, **MySQL**, and **React.js**.

---

## 🌟 Features

1. **Dashboard Overview**
   - Summary cards displaying **Total Income**, **Total Expenses**, and **Remaining Balance**.
   - Quick action shortcuts to record an expense or income entry in one click.
   - Recent transactions table preview.

2. **Add & Edit Transactions**
   - Record amount, category, date, type (Income or Expense), and description.
   - Inline validation and full edit/update support.

3. **Transaction Management & Filtering**
   - Complete table listing of all transactions with formatted currency and badges.
   - Filter transactions dynamically by **Type** (`Income` / `Expense`), **Category**, and **Date Range** (`From Date` to `To Date`).
   - One-click filter reset.

4. **Preset & Extensible Categories**
   - Out-of-the-box categories: `Food`, `Travel`, `Shopping`, `Education`, `Salary`, and `Others`.
   - Distinct, colorful category badges for quick visual identification.

5. **Reports & Analytics**
   - **Expenses by Category**: Visual percentage breakdown and colored progress tracks for each spending category.
   - **Monthly Income vs Expenses**: Side-by-side comparative bar chart tracking cash flow across months with tooltips.

---

## 🏗️ Project Architecture

```
expense-tracker/
├── database/
│   └── schema.sql                               # MySQL database creation & seed data
├── backend/
│   ├── pom.xml                                  # Maven dependencies & plugins
│   └── src/
│       └── main/
│           ├── java/com/expensetracker/
│           │   ├── ExpenseTrackerApplication.java  # Main Spring Boot Runner
│           │   ├── config/
│           │   │   └── CorsConfig.java          # Global CORS configuration
│           │   ├── controller/
│           │   │   └── TransactionController.java # REST API endpoints
│           │   ├── dto/                         # Data Transfer Objects
│           │   │   ├── CategoryExpenseDTO.java
│           │   │   ├── DashboardSummaryDTO.java
│           │   │   └── MonthlyReportDTO.java
│           │   ├── exception/                   # Global exception handling
│           │   │   ├── GlobalExceptionHandler.java
│           │   │   └── ResourceNotFoundException.java
│           │   ├── model/
│           │   │   └── Transaction.java         # JPA Entity
│           │   ├── repository/
│           │   │   └── TransactionRepository.java # JPA & JPQL Queries
│           │   └── service/                     # Service Layer
│           │       ├── TransactionService.java
│           │       └── TransactionServiceImpl.java
│           └── resources/
│               └── application.properties       # DB connection & server port
└── frontend/
    ├── package.json                             # React & Vite dependencies
    ├── vite.config.js                           # Vite configuration
    ├── index.html                               # HTML Entry point
    └── src/
        ├── main.jsx                             # React root renderer
        ├── App.jsx                              # State & UI orchestration
        ├── App.css                              # Component styling
        ├── index.css                            # Modern CSS design system
        ├── api/
        │   └── transactionService.js            # Axios REST client
        └── components/
            ├── Navbar.jsx                       # Navigation header
            ├── Dashboard.jsx                    # Summary + quick actions + recent tx
            ├── SummaryCards.jsx                 # Balance, Income, Expense cards
            ├── TransactionFormModal.jsx         # Add/Edit modal dialog
            ├── TransactionFilters.jsx           # Filter bar
            ├── TransactionTable.jsx             # Filterable transaction list
            └── Reports.jsx                      # Category & monthly charts
```

---

## 🛠️ Prerequisites

Ensure you have the following installed on your machine:
- **Java Development Kit (JDK 17 or higher)** (`java -version`)
- **Node.js (v18 or higher) & npm** (`node -v`, `npm -v`)
- **MySQL Server (v8.0 or higher)** or XAMPP / MariaDB (`mysql -V`)
- Any IDE: **IntelliJ IDEA**, **VS Code**, or **Eclipse** (or Maven CLI)

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Set Up MySQL Database

1. Open **MySQL Workbench**, **phpMyAdmin**, or the **MySQL Command Line Client**:
   ```bash
   mysql -u root -p
   ```
2. Run the script located in `database/schema.sql` or copy and paste the following SQL commands:

```sql
-- 1. Create database
CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

-- 2. Create transactions table
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    transaction_date DATE NOT NULL,
    type VARCHAR(20) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert sample data
INSERT INTO transactions (amount, category, transaction_date, type, description) VALUES
(50000.00, 'Salary', '2026-10-01', 'INCOME', 'Monthly Salary'),
(450.50, 'Food', '2026-10-03', 'EXPENSE', 'Grocery shopping at supermarket'),
(120.00, 'Travel', '2026-10-05', 'EXPENSE', 'Metro and cab fares'),
(1500.00, 'Shopping', '2026-10-08', 'EXPENSE', 'New running shoes'),
(3500.00, 'Education', '2026-10-10', 'EXPENSE', 'Online certification course fee'),
(800.00, 'Food', '2026-10-12', 'EXPENSE', 'Dinner with friends'),
(5000.00, 'Others', '2026-10-15', 'INCOME', 'Freelance consulting work'),
(650.00, 'Travel', '2026-10-17', 'EXPENSE', 'Weekend train ticket');
```

---

### Step 2: Configure & Run Backend (Spring Boot)

1. Open `backend/src/main/resources/application.properties` and verify your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=root
   ```
   *(Change `root` / `root` to your local MySQL username and password if different).*

2. **Run using your favorite IDE**:
   - **IntelliJ IDEA**: Open the `backend/` folder, let Maven sync, and click the green ▶️ Run button on `ExpenseTrackerApplication.java`.
   - **VS Code**: Open `backend/` folder with the *Extension Pack for Java* installed, and click **Run** above `public static void main`.
   - **Command Line (Maven)**:
     ```bash
     cd backend
     mvn spring-boot:run
     ```

3. The backend will start on:
   ```
   http://localhost:8080
   ```

---

### Step 3: Run Frontend (React.js + Vite)

1. Open a new terminal window and navigate to the `frontend/` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## 📡 REST API Documentation

Base URL: `http://localhost:8080/api/transactions`

| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/transactions` | Retrieve all transactions. Supports query parameters `?type=EXPENSE&category=Food&startDate=2026-10-01&endDate=2026-10-31` |
| `GET` | `/api/transactions/{id}` | Get a single transaction by ID |
| `POST` | `/api/transactions` | Add a new transaction |
| `PUT` | `/api/transactions/{id}` | Update an existing transaction |
| `DELETE` | `/api/transactions/{id}` | Delete a transaction |
| `GET` | `/api/transactions/summary` | Get financial metrics (`totalIncome`, `totalExpenses`, `remainingBalance`) |
| `GET` | `/api/transactions/category-summary` | Get expense breakdown by category with percentage distribution |
| `GET` | `/api/transactions/monthly-summary` | Get monthly income vs. expense comparison |
| `GET` | `/api/transactions/categories` | Get all available categories |

### Sample JSON Payload for `POST /api/transactions`
```json
{
  "amount": 250.75,
  "category": "Food",
  "transactionDate": "2026-10-19",
  "type": "EXPENSE",
  "description": "Weekly groceries"
}
```
