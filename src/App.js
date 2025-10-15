App.js
import React from "react";
import "./App.css";
import coffee1 from "./images/coffee1.jpg";
import coffee2 from "./images/coffee2.jpg";
import coffee3 from "./images/coffee3.jpg";

function App() {
  const products = [
    { id: 1, name: "Espresso", price: 2.5, img: coffee1 },
    { id: 2, name: "Latte", price: 3.5, img: coffee2 },
    { id: 3, name: "Cappuccino", price: 3.0, img: coffee3 },
  ];

  return (
    <div className="App">
      <h1>Coffee Shop</h1>
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
    </div>
  );
}

export default App;
