import React from 'react';
import { Edit2, Trash2, ArrowUpRight, ArrowDownLeft, Inbox } from 'lucide-react';

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
  title = 'Transactions',
}) {
  const formatCurrency = (val) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const getCategoryBadgeClass = (category) => {
    const cat = (category || '').toLowerCase();
    switch (cat) {
      case 'food':
        return 'badge-category badge-food';
      case 'travel':
        return 'badge-category badge-travel';
      case 'shopping':
        return 'badge-category badge-shopping';
      case 'education':
        return 'badge-category badge-education';
      case 'salary':
        return 'badge-category badge-salary';
      default:
        return 'badge-category badge-others';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="content-card">
      <div className="card-header-flex">
        <h3 className="section-title">{title}</h3>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {transactions.length} record{transactions.length === 1 ? '' : 's'}
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <Inbox className="empty-icon" />
          <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-secondary)' }}>
            No transactions found
          </p>
          <p style={{ fontSize: '0.85rem' }}>
            Add a new transaction or clear filters to see your records.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ textAlign: 'center', width: '100px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => {
                const isIncome = tx.type?.toUpperCase() === 'INCOME';
                return (
                  <tr key={tx.id}>
                    <td>{formatDate(tx.transactionDate)}</td>
                    <td>
                      <span className={`badge-type ${isIncome ? 'income' : 'expense'}`}>
                        {isIncome ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                        {isIncome ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td>
                      <span className={getCategoryBadgeClass(tx.category)}>
                        {tx.category}
                      </span>
                    </td>
                    <td style={{ maxWidth: '280px', wordBreak: 'break-word' }}>
                      {tx.description || <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className={`table-amount ${isIncome ? 'income' : 'expense'}`}>
                        {isIncome ? '+' : '-'} {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons" style={{ justifyContent: 'center' }}>
                        <button
                          className="btn-icon-edit"
                          title="Edit transaction"
                          onClick={() => onEdit(tx)}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="btn-icon-delete"
                          title="Delete transaction"
                          onClick={() => onDelete(tx.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
