import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ItemDetailPage from './pages/ItemDetailPage';
import ItemFormPage from './pages/ItemFormPage';
import Login from './components/Login';
import Register from './components/Register';
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
        <div className="main-wrapper">
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage refreshTrigger={refreshTrigger} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/items/:id" element={<ItemDetailPage refreshItems={refreshItems} />} />
              <Route
                path="/add-item"
                element={
                  <ProtectedRoute>
                    <ItemFormPage refreshItems={refreshItems} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-item/:id"
                element={
                  <ProtectedRoute>
                    <ItemFormPage refreshItems={refreshItems} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
        <footer className="footer">
          <div className="container">
            <p>&copy; 2025 Inventory Manager. All rights reserved.</p>
            <p>Created by Michael Demchak - Mobile Ready!</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App
