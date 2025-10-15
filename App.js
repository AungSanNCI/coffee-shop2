import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace this URL with your real API Gateway endpoint
    fetch("https://abc1234567.execute-api.us-east-1.amazonaws.com/default/coffeeShopHandler")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="App">
      <h1>Coffee Shop</h1>
      <div className="products">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <h2>{p.name}</h2>
              <p>${p.price.toFixed(2)}</p>
              <button>Checkout</button>
            </div>
          ))
        ) : (
          <p>Loading coffee menu...</p>
        )}
      </div>
    </div>
  );
}

export default App;


