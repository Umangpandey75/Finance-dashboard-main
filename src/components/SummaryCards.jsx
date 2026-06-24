import React, { useEffect, useRef, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const useCountUp = (target, duration = 1000, active = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const abs = Math.abs(target);
    const raf = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(abs * ease);
      if (progress < 1) requestAnimationFrame(raf);
      else setValue(abs);
    };
    requestAnimationFrame(raf);
  }, [target, active]);
  return value;
};

const AnimatedValue = ({ value, prefix, active }) => {
  const count = useCountUp(value, 900, active);
  return <span>{prefix}{formatCurrency(count)}</span>;
};

const SummaryCards = ({ income, expenses, balance, month }) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const monthLabel = month
    ? new Date(month + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'All Time';

  const cards = [
    {
      title: 'Net Balance',
      subtitle: monthLabel,
      value: balance || 0,
      icon: Wallet,
      prefix: balance < 0 ? '-' : '',
      gradient: 'from-blue-500 to-indigo-600',
      glow: 'shadow-blue-200 dark:shadow-blue-200/40',
      iconBg: 'bg-blue-400/20',
      bar: 'bg-blue-400',
      trend: null,
    },
    {
      title: 'Total Income',
      subtitle: monthLabel,
      value: income || 0,
      icon: TrendingUp,
      prefix: '+',
      gradient: 'from-emerald-500 to-green-600',
      glow: 'shadow-emerald-200 dark:shadow-emerald-500/40',
      iconBg: 'bg-emerald-400/20',
      bar: 'bg-emerald-400',
      trend: 'up',
    },
    {
      title: 'Total Expenses',
      subtitle: monthLabel,
      value: expenses || 0,
      icon: TrendingDown,
      prefix: '-',
      gradient: 'from-rose-500 to-red-600',
      glow: 'shadow-rose-200 dark:shadow-rose-500/40',
      iconBg: 'bg-rose-400/20',
      bar: 'bg-rose-400',
      trend: 'down',
    },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isHovered = hovered === index;
        return (
          <div
            key={index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            style={{
              transitionDelay: `${index * 120}ms`,
              transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.94)',
              opacity: visible ? 1 : 0,
              transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease',
            }}
            className={`relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 cursor-default
              shadow-lg hover:shadow-2xl ${card.glow} transition-shadow duration-300`}
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${card.gradient}`} />
            <div
              style={{ opacity: isHovered ? 0.07 : 0.03, transition: 'opacity 0.4s ease' }}
              className={`absolute -top-8 -right-8 w-40 h-40 rounded-full bg-gradient-to-br ${card.gradient} blur-2xl pointer-events-none`}
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div
                  style={{
                    transform: isHovered ? 'scale(1.12) rotate(-6deg)' : 'scale(1) rotate(0deg)',
                    transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                  className={`p-3 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-md`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className='flex flex-wrap justify-between'>
                <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-300 mb-0.5">
                {card.title}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3">{card.subtitle}</p>
              </div>
              <p
                style={{
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                  transition: 'transform 0.3s ease',
                }}
                className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight"
              >
                <AnimatedValue value={Math.abs(card.value)} prefix={card.prefix} active={visible} />
              </p>
              </div>
              <div className="mt-4 h-0.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  style={{
                    width: visible ? '100%' : '0%',
                    transitionDelay: `${index * 120 + 400}ms`,
                    transition: 'width 0.9s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${card.gradient}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SummaryCards;
