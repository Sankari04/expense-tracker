import React from 'react';
import SummaryCards from './SummaryCards';
import TransactionTable from './TransactionTable';
import { PlusCircle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export default function Dashboard({
  summary,
  recentTransactions,
  onOpenAddModalWithType,
  onEditTransaction,
  onDeleteTransaction,
  onViewAllTransactions,
}) {
  return (
    <div>
      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Quick Actions Bar */}
      <div className="quick-actions-bar">
        <button
          className="btn-action-income"
          onClick={() => onOpenAddModalWithType('INCOME')}
        >
          <ArrowUpCircle size={18} />
          <span>Quick Add Income</span>
        </button>

        <button
          className="btn-action-expense"
          onClick={() => onOpenAddModalWithType('EXPENSE')}
        >
          <ArrowDownCircle size={18} />
          <span>Quick Add Expense</span>
        </button>
      </div>

      {/* Recent Transactions Section */}
      <TransactionTable
        title="Recent Transactions"
        transactions={recentTransactions}
        onEdit={onEditTransaction}
        onDelete={onDeleteTransaction}
      />
    </div>
  );
}
