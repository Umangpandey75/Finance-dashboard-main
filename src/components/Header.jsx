import React from 'react'
import {
    calculateTotals,
    formatCurrency
} from '../utils/helpers';
import { useAppContext } from '../context/AppContext';
const Header = () => {
    const { transactions, role, } = useAppContext();
    const { balance } = calculateTotals(transactions);
    return (
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl lg:p-6 p-4 text-white">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl lg:text-2xl font-bold mb-2 ">
                        Welcome to, {role.toUpperCase()}!
                    </h2>
                    <p className="text-blue-100 lg:text-base text-sm">
                        Here's your financial overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <div className="text-right">
                    <p className="lg:text-base text-sm text-blue-100 mb-2">Total Balance</p>
                    <p className="lg:text-2xl text-base font-bold">{formatCurrency(balance)}</p>
                </div>
            </div>
        </div>
    )
}

export default Header