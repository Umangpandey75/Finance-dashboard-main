import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Award, Calendar, IndianRupee, Activity, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const Insights = ({ insights }) => {
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const insightCards = [
    {
      title: 'Highest Spending Category',
      value: insights.highestCategory.name,
      subValue: formatCurrency(insights.highestCategory.amount),
      icon: Award,
      color: 'purple',
      trend: null,
    },
    {
      title: 'Monthly Change',
      value: `${Math.abs(insights.monthlyChange)}%`,
      subValue: insights.monthlyChange >= 0 ? 'Increase' : 'Decrease',
      icon: Calendar,
      color: 'blue',
      trend: insights.monthlyChange >= 0 ? 'up' : 'down',
    },
    {
      title: 'Average Daily Spending',
      value: formatCurrency(parseFloat(insights.avgDailySpending) || 0),
      subValue: 'Per day',
      icon: IndianRupee,
      color: 'orange',
      trend: null,
    },
    {
      title: 'Total Transactions',
      value: insights.totalTransactions,
      subValue: 'All time',
      icon: Activity,
      color: 'green',
      trend: null,
    },
  ];
  const colorClasses = {
    purple: {
      icon: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      glow: 'hover:shadow-purple-200 dark:hover:shadow-purple-900/40',
      bar: 'bg-purple-400',
      border: 'hover:border-purple-300 dark:hover:border-purple-700',
    },
    blue: {
      icon: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      glow: 'hover:shadow-blue-200 dark:hover:shadow-blue-900/40',
      bar: 'bg-blue-400',
      border: 'hover:border-blue-300 dark:hover:border-blue-700',
    },
    orange: {
      icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      glow: 'hover:shadow-orange-200 dark:hover:shadow-orange-900/40',
      bar: 'bg-orange-400',
      border: 'hover:border-orange-300 dark:hover:border-orange-700',
    },
    green: {
      icon: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      glow: 'hover:shadow-green-200 dark:hover:shadow-green-900/40',
      bar: 'bg-green-400',
      border: 'hover:border-green-300 dark:hover:border-green-700',
    },
  };

  return (
    <div className="space-y-6" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card, index) => {
          const Icon = card.icon;
          const colors = colorClasses[card.color];
          const isHovered = hoveredCard === index;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.95)',
                opacity: visible ? 1 : 0,
                transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease',
              }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-transparent ${colors.border} ${colors.glow} hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300`}
            >
              <div
                style={{
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"
              />
              <div
                style={{
                  transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.4s ease',
                  transformOrigin: 'left',
                }}
                className={`absolute top-0 left-0 right-0 h-1 ${colors.bar} rounded-t-2xl`}
              />

              <div className="flex items-start justify-between mb-4">
                <div
                  style={{
                    transform: isHovered ? 'rotate(12deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                  className={`p-3 rounded-xl ${colors.icon}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                {card.trend && (
                  <div
                    style={{
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                      transition: 'transform 0.3s ease',
                    }}
                    className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
                      card.trend === 'up'
                        ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    }`}
                  >
                    {card.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{Math.abs(parseFloat(insights.monthlyChange))}%</span>
                  </div>
                )}
              </div>

              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                {card.title}
              </h3>
              <p
                style={{
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 0.3s ease',
                }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight"
              >
                {card.value}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                {card.subValue}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl p-6 text-white overflow-hidden shadow-xl"
      >
        <div className="relative flex items-start gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1 tracking-tight">Financial Tip</h4>
            <p className="text-sm text-white/90 leading-relaxed">
              {insights.monthlyChange > 0
                ? `Your spending increased by ${insights.monthlyChange}% this month. Consider reviewing your ${insights.highestCategory.name.toLowerCase()} expenses.`
                : `Your spending decreased by ${Math.abs(insights.monthlyChange)}% this month. Keep it up!`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
