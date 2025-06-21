// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';

const linkStyle = {
  textDecoration: 'none',
  color: '#1976d2',
  fontWeight: 'bold',
  fontSize: '18px',
};

const App = () => {
  return (
    <>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '40px', 
        padding: '20px' 
      }}>
        <Link to="/" style={linkStyle}>Cadastro</Link>
        <Link to="/produtos" style={linkStyle}>Lista de Produtos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<ProductList />} />
      </Routes>
    </>
  );
};

export default App;
