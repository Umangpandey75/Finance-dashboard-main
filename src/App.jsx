import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from './context/AppContext';
import Transactions from './components/Transactions';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-150 dark:bg-gray-900 transition-colors duration-200">
          <NavBar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Header/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
            <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-700">
              <Footer />
            </div>
          </main>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
