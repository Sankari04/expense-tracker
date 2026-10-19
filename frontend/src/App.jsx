import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionTable from './components/TransactionTable';
import TransactionFilters from './components/TransactionFilters';
import Reports from './components/Reports';
import TransactionFormModal from './components/TransactionFormModal';
import transactionService from './api/transactionService';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  });
  const [categorySummary, setCategorySummary] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);
  const [categories, setCategories] = useState([
    'Food',
    'Travel',
    'Shopping',
    'Education',
    'Salary',
    'Others',
  ]);

  const [filters, setFilters] = useState({
    type: 'ALL',
    category: 'ALL',
    startDate: '',
    endDate: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch all core datasets
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [txData, summaryData, catData, monthData, allCats] = await Promise.all([
        transactionService.getAll(filters),
        transactionService.getSummary(),
        transactionService.getCategorySummary(),
        transactionService.getMonthlySummary(),
        transactionService.getCategories(),
      ]);

      setTransactions(txData || []);
      setSummary(summaryData || { totalIncome: 0, totalExpenses: 0, remainingBalance: 0 });
      setCategorySummary(catData || []);
      setMonthlySummary(monthData || []);
      if (allCats && allCats.length > 0) {
        setCategories(allCats);
      }
    } catch (err) {
      console.error('Failed to fetch data from backend API:', err);
      showToast('Could not connect to backend server. Make sure Spring Boot is running.', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter handlers
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      type: 'ALL',
      category: 'ALL',
      startDate: '',
      endDate: '',
    });
  };

  // Add / Edit Transaction Handlers
  const handleOpenAddModal = () => {
    setTransactionToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenAddModalWithType = (type) => {
    setTransactionToEdit({
      type,
      category: type === 'INCOME' ? 'Salary' : 'Food',
      amount: '',
      transactionDate: new Date().toISOString().split('T')[0],
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionService.delete(id);
        showToast('Transaction deleted successfully!');
        fetchData();
      } catch (err) {
        console.error('Delete failed:', err);
        showToast('Failed to delete transaction. Please try again.', 'error');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (transactionToEdit && transactionToEdit.id) {
        await transactionService.update(transactionToEdit.id, formData);
        showToast('Transaction updated successfully!');
      } else {
        await transactionService.create(formData);
        showToast('Transaction added successfully!');
      }
      setIsModalOpen(false);
      setTransactionToEdit(null);
      fetchData();
    } catch (err) {
      console.error('Save failed:', err);
      showToast('Failed to save transaction. Please check your input and backend connection.', 'error');
    }
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: toast.type === 'error' ? '#e11d48' : '#10b981',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            zIndex: 9999,
            fontWeight: 600,
            animation: 'fadeIn 0.2s ease-in',
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Top Header / Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
      />

      {/* Loading state indicator */}
      {loading && transactions.length === 0 ? (
        <div className="loading-container">
          <div className="spinner" />
          <p>Connecting to backend API...</p>
        </div>
      ) : (
        <main>
          {/* TAB 1: Dashboard */}
          {activeTab === 'dashboard' && (
            <Dashboard
              summary={summary}
              recentTransactions={transactions.slice(0, 5)}
              onOpenAddModalWithType={handleOpenAddModalWithType}
              onEditTransaction={handleEditTransaction}
              onDeleteTransaction={handleDeleteTransaction}
              onViewAllTransactions={() => setActiveTab('transactions')}
            />
          )}

          {/* TAB 2: Transaction Management */}
          {activeTab === 'transactions' && (
            <div>
              <TransactionFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                categories={categories}
              />
              <TransactionTable
                title="All Transactions"
                transactions={transactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </div>
          )}

          {/* TAB 3: Reports & Analytics */}
          {activeTab === 'reports' && (
            <Reports
              categorySummary={categorySummary}
              monthlySummary={monthlySummary}
            />
          )}
        </main>
      )}

      {/* Add / Edit Transaction Modal */}
      <TransactionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        transactionToEdit={transactionToEdit}
        categories={categories}
      />
    </div>
  );
}
