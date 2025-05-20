import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ItemFormPage from './pages/ItemFormPage';
import ItemDetailPage from './pages/ItemDetailPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<ItemFormPage />} />
              <Route path="/edit/:id" element={<ItemFormPage />} />
              <Route path="/details/:id" element={<ItemDetailPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
