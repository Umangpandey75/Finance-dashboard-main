import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronUp, ChevronDown, Edit2, Trash2, X, Plus, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import { useAppContext } from '../context/AppContext';

const Transactions = () => {
  const {
    role,
    transactions: allTransactions,
    filters,
    setFilters,
    getFilteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useAppContext();

  const availableMonths = [...new Set(allTransactions.map(t => t.date?.slice(0, 7)).filter(Boolean))].sort((a, b) => b.localeCompare(a));

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', description: '', category: '', amount: '', type: 'expense' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [visibleRows, setVisibleRows] = useState(new Set());
  const [deletingId, setDeletingId] = useState(null);
  const rowRefs = useRef({});

  useEffect(() => {
    const handler = () => setShowAddForm(true);
    window.addEventListener('openAddTransactionModal', handler);
    return () => window.removeEventListener('openAddTransactionModal', handler);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', category: '', date: today, type: 'expense' });

  const transactions = getFilteredTransactions();

  useEffect(() => {
    setVisibleRows(new Set());
    transactions.forEach((t, i) => {
      setTimeout(() => {
        setVisibleRows(prev => new Set([...prev, t.id]));
      }, i * 60);
    });
  }, [transactions.length, filters]);

  const handleSort = (key) => {
    setFilters({ ...filters, sortBy: key, sortOrder: filters.sortBy === key && filters.sortOrder === 'asc' ? 'desc' : 'asc' });
  };

  const handleEdit = (transaction) => {
    if (role !== 'admin') return;
    setEditingId(transaction.id);
    setEditForm({ date: transaction.date || '', description: transaction.description || '', category: transaction.category || '', amount: transaction.amount || '', type: transaction.type || 'expense' });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    updateTransaction(editingId, { ...editForm, amount: parseFloat(editForm.amount) || 0 });
    setEditingId(null);
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    if (role !== 'admin') return;
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setDeletingId(id);
      setTimeout(() => { deleteTransaction(id); setDeletingId(null); }, 350);
    }
  };

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category || !newTransaction.date) {
      alert('Please fill all fields');
      return;
    }
    addTransaction({ ...newTransaction, amount: parseFloat(newTransaction.amount) });
    setNewTransaction({ description: '', amount: '', category: '', date: today, type: 'expense' });
    setShowAddForm(false);
  };

  const SortIcon = ({ column }) => {
    if (filters.sortBy !== column) return <ChevronUp className="w-5 h-5 opacity-70" />;
    return filters.sortOrder === 'asc' ? <ChevronUp className="w-5 h-5 text-blue-500" /> : <ChevronDown className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">

      <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/80">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Transactions</h2>
          {role === 'admin' && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
          <div className="relative">
            <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}
              className="appearance-none px-4 py-2 pr-8 w-36 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select value={filters.month} onChange={e => setFilters({ ...filters, month: e.target.value })}
              className="appearance-none px-4 py-2 pr-8 w-40 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
              <option value="">All Months</option>
              {availableMonths.map(m => (
                <option key={m} value={m}>{new Date(m + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700/60 border-b border-gray-100 dark:border-gray-700">
              <th className="lg:px-6 px-3 py-3 w-40 text-left text-xs items-center font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 "
                onClick={() => handleSort('date')}>
                <div className="flex items-center gap-2">
                  Date    <SortIcon column="date" />
                </div>
              </th>
              <th className="lg:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors "
                onClick={() => handleSort('description')}>
                <div className="flex items-center gap-2">
                  Description <SortIcon column="description" />
                </div>
              </th>
              <th className="lg:px-6 px-3 py-3  text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                onClick={() => handleSort('category')}>
                <div className="flex items-center gap-2">
                  Category <SortIcon column="category" />
                </div>
              </th>
              <th className="lg:px-6 px-3 py-3  text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-2">
                  Amount <SortIcon column="amount" />
                </div>
              </th>
              <th className="lg:px-6 px-3 py-3  text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                onClick={() => handleSort('type')}>
                <div className="flex items-center gap-2">
                  Type <SortIcon column="type" />
                </div>
              </th>
              {role === 'admin' && (
                <th className="lg:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
        </thead>

        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={role === 'admin' ? 6 : 5} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
                  <Search className="w-8 h-8 opacity-40" />
                  <p className="text-sm font-medium">No transactions found</p>
                </div>
              </td>
            </tr>
          ) : (
            transactions.map((transaction, index) => {
              const isVisible = visibleRows.has(transaction.id);
              const isDeleting = deletingId === transaction.id;
              const isIncome = transaction.type === 'income';
              return (
                <tr
                  key={transaction.id}
                  style={{
                    transform: isDeleting ? 'translateX(100%)' : isVisible ? 'translateX(0)' : 'translateX(-16px)',
                    opacity: isDeleting ? 0 : isVisible ? 1 : 0,
                    transition: isDeleting
                      ? 'transform 0.35s ease-in, opacity 0.35s ease-in'
                      : 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
                  }}
                  className="hover:bg-blue-100/40 dark:hover:bg-gray-700/40 transition-colors duration-150"
                >
                  <td className="lg:px-6 px-3 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="lg:px-6 px-3 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-[180px] truncate">
                    {transaction.description}
                  </td>
                  <td className="lg:px-6 px-3 py-4 text-sm">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="lg:px-6 px-3 py-4 text-sm font-semibold min-w-[130px]">
                    <span className={`flex items-center gap-1 ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                      {isIncome
                        ? <ArrowUpCircle className="w-4 h-4" />
                        : <ArrowDownCircle className="w-4 h-4" />}
                      {isIncome ? '+' : '-'}{formatCurrency(parseFloat(transaction.amount) || 0)}
                    </span>
                  </td>
                  <td className="lg:px-6 px-3 py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isIncome ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400'}`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="lg:px-6 px-3 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(transaction)}
                          className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(transaction.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
      {showAddForm && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAddForm(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Add Transaction</h3>
            <button onClick={() => setShowAddForm(false)}>
              <X className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Description"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleAddTransaction}
                className="flex-1 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
          </div>
          </div>
        
      )}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Transaction</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Date</label>
                <input type="date" value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Description</label>
                <input type="text" value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Category</label>
                <input type="text" value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Amount</label>
                <input type="number" value={editForm.amount ?? ''}
                  onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Type</label>
                <select value={editForm.type}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleSaveEdit}
                  className="flex-1 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
                <button onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default Transactions;
