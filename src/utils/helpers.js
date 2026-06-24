export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const calculateTotals = (transactions) => {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return { income, expenses, balance };
};

export const getCategoryBreakdown = (transactions) => {
    const categoryMap = new Map();

    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
        });

    return Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));
};

export const getMonthlyTrend = (transactions) => {
    const monthlyMap = new Map();

    transactions.forEach(t => {
        const date = new Date(t.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const label = date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
        if (!monthlyMap.has(key)) {
            monthlyMap.set(key, { month: label, sortKey: key, income: 0, expenses: 0 });
        }
        const data = monthlyMap.get(key);
        if (t.type === 'income') {
            data.income += t.amount;
        } else {
            data.expenses += t.amount;
        }
    });

    return Array.from(monthlyMap.values())
        .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
        .map(({ month, income, expenses }) => ({ month, income, expenses }));
};

export const getInsights = (transactions) => {
    const expenses = transactions.filter(t => t.type === 'expense');

    const categorySpending = {};
    expenses.forEach(t => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
    });

    let highestCategory = { name: 'None', amount: 0 };
    Object.entries(categorySpending).forEach(([name, amount]) => {
        if (amount > highestCategory.amount) {
            highestCategory = { name, amount };
        }
    });
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthExpenses = expenses.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = expenses.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    }).reduce((sum, t) => sum + t.amount, 0);

    const monthlyChange = lastMonthExpenses === 0
        ? 100
        : ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

    const uniqueDays = new Set(expenses.map(t => t.date)).size;
    const avgDailySpending = uniqueDays === 0 ? 0 : expenses.reduce((sum, t) => sum + t.amount, 0) / uniqueDays;

    return {
        highestCategory,
        monthlyChange: monthlyChange.toFixed(1),
        avgDailySpending: avgDailySpending.toFixed(2),
        totalTransactions: transactions.length,
    };
};