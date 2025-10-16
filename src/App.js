import React, { useState } from "react";
import "./App.css";

function App() {
  const products = [
    { id: 1, name: "Espresso", price: 2.5 },
    { id: 2, name: "Latte", price: 3.5 },
    { id: 3, name: "Cappuccino", price: 3.0 },
  ];

  const [order, setOrder] = useState({ name: "", type: "", quantity: 1 });
  const [confirmation, setConfirmation] = useState("");

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://e56lxb9jyl.execute-api.us-east-1.amazonaws.com/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setConfirmation(`✅ ${data.message} (ID: ${data.orderId})`);
          setOrder({ name: "", type: "", quantity: 1 });
        } else {
          setConfirmation(`❌ ${data.message}`);
        }
      })
      .catch((err) => {
        console.error(err);
        setConfirmation("❌ Failed to submit order. Please try again.");
      });
  };

  return (
    <div className="App">
      <h1>Coffee Shop</h1>

      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h3>{p.name}</h3>
            <p>${p.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <form className="order-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={order.name}
          onChange={handleChange}
          required
        />
        <select
          name="type"
          value={order.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Coffee</option>
          {products.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="quantity"
          min="1"
          value={order.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Order</button>
      </form>

      {confirmation && (
        <div className="order-confirmation">{confirmation}</div>
      )}
    </div>
  );
}

export default App;
