import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import "../App.css";

function Cart() {
  const { orders, cartItems, handleCartClicked, handleOrderCompleted } =
    useContext(ShopContext);

  const [email, setEmail] = useState("");

  // eslint-disable-next-line no-useless-escape
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const completeClicked = (cart) => {
    if (email.length === 0) {
      document.querySelector(".error").textContent =
        "please provide your email";
    } else {
      if (email.match(pattern)) {
        handleOrderCompleted(cart);
        setEmail("");
      } else {
        document.querySelector(".error").textContent =
          "please provide a valid email";
      }
    }
  };

  return (
    <div className="cartContainer">
      <div className="cartDisplay">
        <section>
          {cartItems.length > 0 ? (
            cartItems.map(({ title, price, image, quantity }, index) => (
              <div className="display" key={index}>
                <img src={image} alt={image} />
                <span>{title.slice(0, 35)}...</span>
                <span>${price}</span>
                <span>x{quantity}</span>
              </div>
            ))
          ) : (
            <p>No items in your cart</p>
          )}
        </section>
        <button className="close" onClick={handleCartClicked}>
          X
        </button>
        <p>
          Total: $
          {cartItems
            .reduce((prev, { price, quantity }) => prev + price * quantity, 0)
            .toFixed(2)}
        </p>
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => completeClicked(cartItems)}>
            Complete Order
          </button>
          <span className="error"></span>
        </div>
        <div className="orders">
          {orders.map(({ orderId }) => (
            <div key={orderId}>
              <p>Order {orderId.slice(0, 7)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
