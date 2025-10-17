import React, { useState } from "react";
import "./App.css";
import coffee1 from "./images/coffee1.jpg";
import coffee2 from "./images/coffee2.jpg";
import coffee3 from "./images/coffee3.jpg";
import { v4 as uuidv4 } from "uuid"; // <-- Added uuid import

function App() {
  const products = [
    { id: 1, name: "Espresso", price: 2.5, img: coffee1 },
    { id: 2, name: "Latte", price: 3.5, img: coffee2 },
    { id: 3, name: "Cappuccino", price: 3.0, img: coffee3 },
  ];

  const [order, setOrder] = useState({ name: "", type: "", quantity: 1 });
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleOrderChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    // Add a unique ID to the order
    const orderWithId = { ...order, id: uuidv4() };
    console.log("Order submitted:", orderWithId);

    // Simulated submit
    setCheckoutComplete(true);
    setTimeout(() => setCheckoutComplete(false), 3000);
    setOrder({ name: "", type: "", quantity: 1 });
  };

  return (
    <div className="App">
      <nav className="menu">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#order">Order</a></li>
        </ul>
      </nav>

      <section id="home">
        <h1>☕ Coffee Shop</h1>
        <p>Freshly brewed happiness in every cup.</p>
      </section>

      <section id="menu">
        <h2>Our Menu</h2>
        <div className="products">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <img src={p.img} alt={p.name} width="150" />
              <h3>{p.name}</h3>
              <p>${p.price.toFixed(2)}</p>
              <button disabled>Checkout</button>
            </div>
          ))}
        </div>
      </section>

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
          <select
            name="type"
            value={order.type}
            onChange={handleOrderChange}
            required
          >
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

      <section id="about">
        <h2>About Us</h2>
        <p>
          At Coffee Shop, we handcraft every cup using premium coffee beans sourced
          from sustainable farms around the world. Whether you prefer espresso,
          latte, or cappuccino, every sip is a taste of perfection.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>Email: hello@coffeeshop.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Visit us: 123 Brew Street, Bean City</p>
      </section>

      {checkoutComplete && (
        <div className="success-popup">
          <svg className="checkmark" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark__check" fill="none" d="M14 27l7 7 16-16"/>
          </svg>
          <h3>Order Complete!</h3>
        </div>
      )}
    </div>
  );
}

export default App;
