import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockTransactions } from '../data/mockdata';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used to AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
    const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || 'viewer';
  });
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : MockTransactions();
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

 useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);
  
  const [filters, setFilters] = useState({
    type: 'all',
    search: '',
    month: '',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: transaction.date || new Date().toISOString().split('T')[0],
      amount: parseFloat(transaction.amount) || 0,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, ...updatedTransaction } : t
    ));
  };
  
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };
  const getFilteredTransactions = () => {
    let filtered = [...transactions];
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.month) {
      filtered = filtered.filter(t => t.date && t.date.slice(0, 7) === filters.month);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(t =>
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower) ||
        t.type.toLowerCase().includes(searchLower) ||
        String(t.amount).includes(searchLower)
      );
    }
    
    filtered.sort((a, b) => {
      let aVal = a[filters.sortBy];
      let bVal = b[filters.sortBy];
      
      if (filters.sortBy === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (aVal < bVal) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  };
  
  const value = {
    transactions,
    role,
    setRole,
    darkMode,
    setDarkMode,
    filters,
    setFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFilteredTransactions,
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};