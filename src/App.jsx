import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div>
            <h1>Welcome To Paradise Nursery</h1>
            <button onClick={() => setShowProductList(true)}>Get Started</button>
          </div>
          <AboutUs />
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}
export default App;
