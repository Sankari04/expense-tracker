import React from 'react';
import { TrendingUp, TrendingDown, WalletCards } from 'lucide-react';

export default function SummaryCards({ summary }) {
  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const income = summary?.totalIncome ?? 0;
  const expense = summary?.totalExpenses ?? 0;
  const balance = summary?.remainingBalance ?? 0;

  return (
    <div className="summary-grid">
      {/* Total Income */}
      <div className="summary-card income">
        <div className="summary-info">
          <span className="summary-label">Total Income</span>
          <span className="summary-amount income">{formatCurrency(income)}</span>
        </div>
        <div className="summary-card-icon">
          <TrendingUp size={28} />
        </div>
      </div>

      {/* Total Expenses */}
      <div className="summary-card expense">
        <div className="summary-info">
          <span className="summary-label">Total Expenses</span>
          <span className="summary-amount expense">{formatCurrency(expense)}</span>
        </div>
        <div className="summary-card-icon">
          <TrendingDown size={28} />
        </div>
      </div>

      {/* Remaining Balance */}
      <div className="summary-card balance">
        <div className="summary-info">
          <span className="summary-label">Remaining Balance</span>
          <span className="summary-amount balance">{formatCurrency(balance)}</span>
        </div>
        <div className="summary-card-icon">
          <WalletCards size={28} />
        </div>
      </div>
    </div>
  );
}
