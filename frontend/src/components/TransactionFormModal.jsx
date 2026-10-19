import React, { useState, useEffect } from 'react';
import { X, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export default function TransactionFormModal({
  isOpen,
  onClose,
  onSubmit,
  transactionToEdit,
  categories,
}) {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    transactionDate: new Date().toISOString().split('T')[0],
    type: 'EXPENSE',
    description: '',
  });

  const [error, setError] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        amount: transactionToEdit.amount || '',
        category: transactionToEdit.category || 'Food',
        transactionDate: transactionToEdit.transactionDate || new Date().toISOString().split('T')[0],
        type: transactionToEdit.type || 'EXPENSE',
        description: transactionToEdit.description || '',
      });
    } else {
      setFormData({
        amount: '',
        category: 'Food',
        transactionDate: new Date().toISOString().split('T')[0],
        type: 'EXPENSE',
        description: '',
      });
    }
    setError('');
  }, [transactionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeSelect = (selectedType) => {
    setFormData((prev) => ({
      ...prev,
      type: selectedType,
      // Default recommended categories based on type
      category: selectedType === 'INCOME' ? 'Salary' : 'Food',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    if (!formData.category) {
      setError('Please select a category.');
      return;
    }
    if (!formData.transactionDate) {
      setError('Please select a transaction date.');
      return;
    }

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  const isEdit = Boolean(transactionToEdit);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {isEdit ? 'Edit Transaction' : 'Add New Transaction'}
          </h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div style={{ color: '#e11d48', fontSize: '0.88rem', background: '#ffe4e6', padding: '10px 14px', borderRadius: '8px' }}>
              {error}
            </div>
          )}

          {/* Type Toggle: Income or Expense */}
          <div className="type-toggle-group">
            <button
              type="button"
              className={`type-btn ${formData.type === 'INCOME' ? 'selected-income' : ''}`}
              onClick={() => handleTypeSelect('INCOME')}
            >
              <ArrowUpCircle size={20} />
              <span>Income</span>
            </button>

            <button
              type="button"
              className={`type-btn ${formData.type === 'EXPENSE' ? 'selected-expense' : ''}`}
              onClick={() => handleTypeSelect('EXPENSE')}
            >
              <ArrowDownCircle size={20} />
              <span>Expense</span>
            </button>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              name="amount"
              className="form-input"
              placeholder="e.g. 50.00"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories && categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))
              ) : (
                <>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Education">Education</option>
                  <option value="Salary">Salary</option>
                  <option value="Others">Others</option>
                </>
              )}
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">Transaction Date</label>
            <input
              type="date"
              name="transactionDate"
              className="form-input"
              value={formData.transactionDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="e.g. Grocery supplies for the week"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Modal Actions */}
          <div className="form-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEdit ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
