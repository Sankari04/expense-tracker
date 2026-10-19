import React from 'react';
import { Wallet, LayoutDashboard, ReceiptText, BarChart3, PlusCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAddModal }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Wallet size={24} />
        </div>
        <div>
          <span className="brand-title">ExpenseTracker</span>
          <span className="brand-tag">v1.0</span>
        </div>
      </div>

      <nav className="nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          <ReceiptText size={18} />
          <span>Transactions</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <BarChart3 size={18} />
          <span>Reports</span>
        </button>
      </nav>

      <button className="btn-primary-add" onClick={onOpenAddModal}>
        <PlusCircle size={18} />
        <span>Add Transaction</span>
      </button>
    </header>
  );
}
