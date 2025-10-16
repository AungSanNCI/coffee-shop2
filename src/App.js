import React, { useState } from "react";
import "./App.css";
import coffee1 from "./images/coffee1.jpg";
import coffee2 from "./images/coffee2.jpg";
import coffee3 from "./images/coffee3.jpg";
import Amplify, { API } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App() {
  const products = [
    { id: 1, name: "Espresso", price: 2.5, img: coffee1 },
    { id: 2, name: "Latte", price: 3.5, img: coffee2 },
    { id: 3, name: "Cappuccino", price: 3.0, img: coffee3 },
  ];

  const [order, setOrder] = useState({ name: "", type: "", quantity: 1 });

  const handleOrderChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("ordersApi", "/orders", { body: order });
      alert(`Order submitted! Thank you, ${order.name}. Order ID: ${response.orderId}`);
      setOrder({ name: "", type: "", quantity: 1 });
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#order">Order</a></li>
        </ul>
      </nav>

      {/* Home */}
      <section id="home">
        <h1>☕ Coffee Shop</h1>
        <p>Freshly brewed happiness in every cup.</p>
      </section>

      {/* Menu */}
      <section id="menu">
        <h2>Our Menu</h2>
        <div className="products">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.img} alt={p.name} width="150" />
              <h3>{p.name}</h3>
              <p>${p.price.toFixed(2)}</p>
              <button onClick={() => setOrder({ ...order, type: p.name, quantity: 1 })}>
                Checkout
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Order Form */}
      <section id="order">
        <h2>Place Your Order</h2>
        <form className="order-form" onSubmit={handleOrderSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={order.name}
            onChange={handleOrderChange}
            required
          />
          <select name="type" value={order.type} onChange={handleOrderChange} required>
            <option value="">Select Coffee Type</option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={order.quantity}
            onChange={handleOrderChange}
            min="1"
            required
          />
          <button type="submit">Submit Order</button>
        </form>
      </section>

      {/* About */}
      <section id="about">
        <h2>About Us</h2>
        <p>
          At Coffee Shop, we handcraft every cup using premium coffee beans sourced
          from sustainable farms around the world.
        </p>
      </section>

      {/* Contact */}
      <section id="contact">
        <h2>Contact Us</h2>
        <p>Email: hello@coffeeshop.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Visit us: 123 Brew Street, Bean City</p>
      </section>
    </div>
  );
}

export default App;
