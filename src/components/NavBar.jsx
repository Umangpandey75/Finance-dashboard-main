import React, { useRef, useEffect, useState } from 'react'
import { Sun, Moon, Download, User, Menu, X, ChevronDown, ChevronUp, Landmark } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import RoleToggle from './RoleBase';
import { useNavigate, useLocation } from 'react-router-dom';

const mobilebreakpoint = 800;

const NavBar = () => {
    const { transactions, darkMode, setDarkMode, role, } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [showUser, setShowUser] = useState(false);
    const [isdownload, setIsdownload] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mobilebreakpoint);
    const userRef = useRef(null);
    const downRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < mobilebreakpoint);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 300000);

        return () => clearInterval(interval);
    }, []);
    const exportToCSV = () => {
        const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
        const csvData = transactions.map(t => [
            t.date,
            `"${t.description}"`,
            t.category,
            t.type,
            t.amount
        ]);
        const csvContent = [headers, ...csvData]
            .map(row => row.join(','))
            .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        addNotification('Data exported successfully!', 'success');
    };
    const exportToJSON = () => {
        const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        addNotification('Data exported successfully!', 'success');
    };
    return (
        <>
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap justify-between items-center relative">
                        <button
                            onClick={() => navigate('/')}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <Landmark className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                                        Finance Dashboard
                                    </h1>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Last updated: {lastUpdated.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </button>
                        <div className="flex items-center gap-3">
                            {!isMobile && (
                            <div className="flex items-center gap-3">
                                <div className="relative group" >
                                    <button
                                        onClick={() => navigate('/')}
                                        className={`flex font-medium  items-center gap-2 p-2 transition-colors ${location.pathname === '/'
                                            ? 'text-blue-600 dark:text-blue-500'
                                            : 'dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-500'
                                            }`}
                                    >
                                        <div className='text-base'>
                                            Home
                                        </div>
                                    </button>
                                </div>
                                <div className="relative group" >
                                    <button
                                        onClick={() => navigate('/transactions')}
                                        className={`flex font-medium items-center  gap-2 p-2 transition-colors ${location.pathname === '/transactions'
                                            ? 'text-blue-600 dark:text-blue-500'
                                            : 'dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-500'
                                            }`}
                                    ><div className='text-base'>
                                            Transactions
                                        </div>

                                    </button>
                                </div>
                                <div className="relative" ref={downRef} onMouseEnter={() => setIsdownload(true)} onMouseLeave={() => setIsdownload(false)}>
                                    <button
                                        className="flex font-medium text-base items-center gap-2 p-2 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                                    >
                                        <div className='text-base'>Download</div>
                                        {isdownload ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                    {isdownload && (
                                        <div className="absolute -right-3 p-3 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                            <div className="flex flex-col">
                                                <button
                                                    onClick={() => exportToJSON()}
                                                    className="rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">
                                                        <Download className="w-5 h-5"/>
                                                        <p>Export to JSON</p>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => exportToCSV()}
                                                    className="rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">
                                                        <Download className="w-5 h-5"/>
                                                        <p>Export to CSV</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative" ref={userRef} onMouseEnter={() => setShowUser(true)} onMouseLeave={() => setShowUser(false)}>
                                    <button
                                        className="flex items-center gap-2 p-2 dark:text-gray-100 rounded-lg bg-gray-50 dark:bg-gray-900 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="text-base font-medium hidden sm:inline">
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </span>
                                        {showUser ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                    {showUser && (
                                        <div className="absolute right-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                            <RoleToggle onClose={() => setShowUser(false)} />
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                >
                                    {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
                                </button>
                            </div>
                            )}
                        </div>
                        {/* Mobile hamburger */}
                        {isMobile && (
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile*/}
            {mobileMenuOpen && isMobile && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
                    <div className="relative w-48 h-full bg-white dark:bg-gray-900 shadow-xl flex flex-col py-4">
                        <div className="flex justify-between items-center px-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => { setDarkMode(!darkMode); setMobileMenuOpen(false); }}
                                className="flex items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-200 transition-colors"
                            >
                                {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-400" />}
                            </button>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X size={20} className="text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                        <div className="flex flex-col mt-2">
                            <div className="relative group" >
                                <button
                                    onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                                    className={`flex font-medium items-center  gap-3 px-4 py-2 transition-colors ${location.pathname === '/'
                                        ? 'text-blue-600 dark:text-blue-500'
                                        : 'dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-500'
                                        }`}
                                >
                                    <div className='text-base'>
                                        Home
                                    </div>
                                </button>
                            </div>
                            <div className="relative group" >
                                <button
                                    onClick={() => { navigate('/transactions'); setMobileMenuOpen(false); }}
                                    className={`flex font-medium  items-center gap-3 px-4 py-2 transition-colors ${location.pathname === '/transactions'
                                        ? 'text-blue-600 dark:text-blue-500'
                                        : 'dark:text-gray-100  hover:text-blue-600 dark:hover:text-blue-500'
                                        }`}
                                >
                                    <div className='text-base'>
                                        Transactions
                                    </div>
                                </button>
                            </div>
                            <div className="relative " ref={downRef}>
                                <button
                                    onClick={() => setIsdownload(!isdownload)}
                                    className="flex font-medium  dark:text-gray-100 items-center gap-3 px-4 py-2 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                                >
                                    <div className='text-base'>
                                        Download
                                    </div>
                                    {isdownload ? <ChevronUp className="w-4 h-4 " /> : <ChevronDown className="w-4 h-4 " />}
                                </button>
                                {isdownload && (<div className="flex flex-col pl-2">
                                    <button
                                        onClick={() => { exportToJSON(); setMobileMenuOpen(false); }}
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">Export JSON</span>

                                    </button>
                                    <button
                                        onClick={() => { exportToCSV(); setMobileMenuOpen(false); }}
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                                    >
                                        <Download className="w-4 h-4 " />
                                        <span className="text-xs font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-500">Export CSV</span>
                                    </button>
                                </div>
                                )}
                            </div>
                            <div className="relative" ref={userRef}>
                                <button
                                    onClick={() => setShowUser(!showUser)}
                                    className="w-full flex items-center gap-3 px-4 py-2  dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                                >
                                    <User className="w-5 h-5  dark:text-gray-100" />
                                    <span className="text-base font-medium  dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-500">{role.charAt(0).toUpperCase() +
                                        role.slice(1)}</span>
                                    {showUser ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                {showUser && (
                                    <div className="mx-2  rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 pl-1">
                                        <RoleToggle onClose={() => { setShowUser(false); setMobileMenuOpen(false); }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavBar
