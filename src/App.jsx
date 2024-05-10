
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes instead of BrowserRouter
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail'; // Import the ProductDetail component
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} /> {/* Route for ProductDetail */}
    </Routes>
  );
}

export default App;
