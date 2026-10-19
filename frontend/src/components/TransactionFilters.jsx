import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';

export default function TransactionFilters({
  filters,
  onFilterChange,
  onResetFilters,
  categories,
}) {
  return (
    <div className="filters-toolbar">
      {/* Type Filter */}
      <div className="filter-group">
        <label className="filter-label">Type</label>
        <select
          className="filter-select"
          value={filters.type || 'ALL'}
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          <option value="ALL">All Types</option>
          <option value="INCOME">Income (+)</option>
          <option value="EXPENSE">Expense (-)</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          className="filter-select"
          value={filters.category || 'ALL'}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="ALL">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Start Date */}
      <div className="filter-group">
        <label className="filter-label">From Date</label>
        <input
          type="date"
          className="filter-input"
          value={filters.startDate || ''}
          onChange={(e) => onFilterChange('startDate', e.target.value)}
        />
      </div>

      {/* End Date */}
      <div className="filter-group">
        <label className="filter-label">To Date</label>
        <input
          type="date"
          className="filter-input"
          value={filters.endDate || ''}
          onChange={(e) => onFilterChange('endDate', e.target.value)}
        />
      </div>

      {/* Reset Button */}
      <button className="btn-reset-filters" onClick={onResetFilters} title="Reset all filters">
        <RotateCcw size={16} />
        <span>Reset</span>
      </button>
    </div>
  );
}
