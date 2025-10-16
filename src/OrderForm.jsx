import { useState } from "react";

export default function OrderForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(1);

  const submitOrder = async () => {
    try {
      const response = await fetch(
        "https://d8rnt8j0w2.execute-api.us-east-1.amazonaws.com/default/SaveCoffeeOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, type, quantity }),
        }
      );
      const data = await response.json();
      console.log("Order response:", data);
      alert(`Order saved! ID: ${data.orderId}`);
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Error saving order");
    }
  };

  return (
    <div>
      <input
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Coffee type (e.g., Latte)"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={submitOrder}>Submit Order</button>
    </div>
  );
}
