import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import coffee1 from "./images/coffee1.jpg";
import coffee2 from "./images/coffee2.jpg";
import coffee3 from "./images/coffee3.jpg";
import "./App.css";

// Home page component showing products
function Home() {
  const products = [
    { id: 1, name: "Espresso", price: 2.5, img: coffee1 },
    { id: 2, name: "Latte", price: 3.5, img: coffee2 },
    { id: 3, name: "Cappuccino", price: 3.0, img: coffee3 },
  ];

  return (
    <div className="products">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.img} alt={p.name} width="150" />
          <h2>{p.name}</h2>
          <p>${p.price.toFixed(2)}</p>
          <button>Checkout</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Coffee Shop</h1>

        {/* Navigation Menu */}
        <nav className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
