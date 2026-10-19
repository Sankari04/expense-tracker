import React from 'react';
import { PieChart, Calendar, TrendingDown, Layers } from 'lucide-react';

export default function Reports({ categorySummary, monthlySummary }) {
  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const getCategoryColor = (category) => {
    const cat = (category || '').toLowerCase();
    switch (cat) {
      case 'food':
        return '#f97316';
      case 'travel':
        return '#06b6d4';
      case 'shopping':
        return '#ec4899';
      case 'education':
        return '#8b5cf6';
      case 'salary':
        return '#10b981';
      default:
        return '#64748b';
    }
  };

  // Find max value in monthly data for responsive bar scaling
  const maxMonthlyVal = Math.max(
    ...monthlySummary.map((m) => Math.max(Number(m.income) || 0, Number(m.expense) || 0)),
    100
  );

  return (
    <div className="reports-grid">
      {/* 1. Category Expense Breakdown */}
      <div className="content-card">
        <div className="card-header-flex">
          <h3 className="section-title">
            <PieChart size={20} color="var(--primary)" />
            <span>Expenses by Category</span>
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {categorySummary.length} Categor{categorySummary.length === 1 ? 'y' : 'ies'}
          </span>
        </div>

        {categorySummary.length === 0 ? (
          <div className="empty-state">
            <Layers className="empty-icon" />
            <p>No expense data available to report yet.</p>
          </div>
        ) : (
          <div className="category-bar-list">
            {categorySummary.map((item) => {
              const color = getCategoryColor(item.category);
              return (
                <div key={item.category} className="category-bar-item">
                  <div className="category-bar-header">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          display: 'inline-block',
                        }}
                      />
                      <strong>{item.category}</strong>
                    </span>
                    <span>
                      {formatCurrency(item.totalAmount)}{' '}
                      <small style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
                        ({item.percentage}%)
                      </small>
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${Math.min(item.percentage, 100)}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Monthly Income vs Expenses Comparison */}
      <div className="content-card">
        <div className="card-header-flex">
          <h3 className="section-title">
            <Calendar size={20} color="var(--primary)" />
            <span>Monthly Income vs Expenses</span>
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Overview
          </span>
        </div>

        {monthlySummary.length === 0 ? (
          <div className="empty-state">
            <TrendingDown className="empty-icon" />
            <p>No monthly records available to compare yet.</p>
          </div>
        ) : (
          <>
            <div className="monthly-chart-container">
              {monthlySummary.map((m) => {
                const incomeHeight = Math.round(((Number(m.income) || 0) / maxMonthlyVal) * 160);
                const expenseHeight = Math.round(((Number(m.expense) || 0) / maxMonthlyVal) * 160);

                return (
                  <div key={m.month} className="month-bar-group">
                    <div className="bars-wrapper">
                      {/* Income Bar */}
                      <div
                        className="chart-bar income-bar"
                        style={{ height: `${Math.max(incomeHeight, 6)}px` }}
                        data-tooltip={`Income: ${formatCurrency(m.income)}`}
                      />
                      {/* Expense Bar */}
                      <div
                        className="chart-bar expense-bar"
                        style={{ height: `${Math.max(expenseHeight, 6)}px` }}
                        data-tooltip={`Expense: ${formatCurrency(m.expense)}`}
                      />
                    </div>
                    <span className="month-label">{m.month}</span>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend */}
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-dot income" />
                <span>Income</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot expense" />
                <span>Expense</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
