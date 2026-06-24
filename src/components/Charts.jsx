import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,Cell,XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../utils/helpers';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-gray-900 dark:text-white" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MonthlyTrendChart = ({ data }) => {
  const formatYAxis = (value) => {
    if (value >= 100000) return `${formatCurrency((value / 100000).toFixed(1))}L`;
    if (value >= 1000) return `${formatCurrency((value / 1000).toFixed(1))}K`;
    return `${formatCurrency(value)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Income vs Expenses
      </h3>
      {data.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-24">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbdfe4" className="dark:stroke-gray-700" />
            <XAxis
              dataKey="month"
              stroke="#9CA3AF"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={true}
            />
            <YAxis
              tickFormatter={formatYAxis}
              stroke="#9CA3AF"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={true}
              axisLine={true}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '16px' }} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={2.5}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export const SpendingBreakdownChart = ({ data }) => {
  const formatYAxis = (value) => {
    if (value >= 100000) return `${formatCurrency((value / 100000).toFixed(1))}L`;
    if (value >= 1000) return `${formatCurrency((value / 1000).toFixed(1))}K`;
    return `${formatCurrency(value)}`;
  };

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Spending by Category
      </h3>
      {sortedData.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-24">
          No expense data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={sortedData} margin={{ top: 5, right: 20, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbdfe4" vertical={false} className="dark:stroke-gray-700" />
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tickFormatter={formatYAxis}
              stroke="#9CA3AF"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" name="Amount" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};