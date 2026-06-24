import React, { useState } from 'react';
import { CalendarDays,ChevronDown, } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SummaryCards from './SummaryCards';
import { MonthlyTrendChart, SpendingBreakdownChart } from './Charts';
import Insights from './Insights';
import {
  calculateTotals,
  getCategoryBreakdown,
  getMonthlyTrend,
  getInsights,
} from '../utils/helpers';
const Dashboard = () => {
  const { transactions, role } = useAppContext();

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  );

  const monthlyTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    return key === selectedMonth;
  });

  const { income, expenses, balance } = calculateTotals(monthlyTransactions);
  const categoryData = getCategoryBreakdown(transactions);
  const monthlyData = getMonthlyTrend(transactions);
  const insights = getInsights(transactions);

  const availableMonths = [...new Set(transactions.map(t => {
    const d = new Date(t.date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }))].sort((a, b) => b.localeCompare(a));

  return (
    <div className="min-h-screen ">
      <div className="mb-5 animate-fade-in">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-5 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Viewing Summary For</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {new Date(selectedMonth + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-9 appearance-none pr-4 py-2 text-sm font-medium border border-blue-250 dark:border-blue-800 rounded-xl bg-blue dark:bg-white text-gray-700 dark:text-gray-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors"
              >
                {availableMonths.map(m => (
                  <option key={m} value={m}>
                    {new Date(m + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
        <SummaryCards income={income} expenses={expenses} balance={balance} month={selectedMonth} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <MonthlyTrendChart data={monthlyData} />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <SpendingBreakdownChart data={categoryData} />
        </div>
      </div>
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <Insights insights={insights} />
      </div>
    </div>
  );
};

export default Dashboard;