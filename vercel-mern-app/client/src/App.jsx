import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ItemDetailPage from './pages/ItemDetailPage';
import ItemFormPage from './pages/ItemFormPage';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshItems = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage refreshTrigger={refreshTrigger} />} />
            <Route path="/items/:id" element={<ItemDetailPage refreshItems={refreshItems} />} />
            <Route path="/add-item" element={<ItemFormPage refreshItems={refreshItems} />} />
            <Route path="/edit-item/:id" element={<ItemFormPage refreshItems={refreshItems} />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 Inventory Manager. All rights reserved.</p>
            <p>Created by Michael Demchak</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App
