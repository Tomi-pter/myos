import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import "../App.css";

function Cart() {
  const { orders, cartItems, handleCartClicked, handleOrderCompleted } =
    useContext(ShopContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const completeClicked = (cart) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.length === 0) {
      setError("please provide your email");
      return;
    }
    if (!email.match(pattern)) {
      setError("please provide a valid email");
      return;
    }
    if (cart.length === 0) {
      setError("you cannot checkout an empty cart");
      return;
    }

    handleOrderCompleted(cart);
    setEmail("");
    setError("");
  };

  return (
    <div className="cartContainer">
      <div className="cartDisplay">
        <section>
          {cartItems.length > 0 ? (
            cartItems.map(({ title, price, image, quantity }, index) => (
              <div className="display" key={index}>
                <div>
                  <img src={image} alt={image} />
                </div>
                <p>{title.slice(0, 35)}...</p>
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
          <button
            className="submitButton"
            onClick={() => completeClicked(cartItems)}
          >
            Complete Order
          </button>
          <span className="error">{error}</span>
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
