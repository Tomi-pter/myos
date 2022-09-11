import { useContext } from "react";
import "../App.css";
import cart from "../assets/cart.svg";
import ShopContext from "../context/ShopContext";
import Cart from "./Cart";
import Loader from "./Loader";

function Shop() {
  const {
    items,
    cartItems,
    itemsSearch,
    addToCart,
    handleSearchChange,
    handleCartClicked,
    cartClicked,
    isLoading,
  } = useContext(ShopContext);

  return (
    <main>
      <header>
        <h1>Myos Shop</h1>
        <div className="cartImg">
          <button onClick={handleCartClicked}>
            <img src={cart} alt="cart" />
            <span>{cartItems.length}</span>
          </button>
        </div>
      </header>
      <div className="search">
        <label htmlFor="itemsSearch">Search:</label>
        <input
          type="search"
          name="itemsSearch"
          id="itemsSearch"
          value={itemsSearch}
          onChange={(e) => handleSearchChange(e)}
        />
      </div>
      <div className="itemsContainer">
        {itemsSearch
          ? items
              .filter(
                ({ title, description }) =>
                  title.toLowerCase().includes(itemsSearch.toLowerCase()) ||
                  description.toLowerCase().includes(itemsSearch.toLowerCase())
              )
              .map(({ title, price, description, image, id }) => (
                <div key={id} className="item">
                  <div className="itemImage">
                    <img src={image} alt={image} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span>${price}</span>
                  <button onClick={() => addToCart(title, price, image, id)}>
                    Add to cart
                  </button>
                </div>
              ))
          : items.map(({ title, price, description, image, id }) => (
              <div key={id} className="item">
                <div className="itemImage">
                  <img src={image} alt={image} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>${price}</span>
                <button onClick={() => addToCart(title, price, image, id)}>
                  Add to cart
                </button>
              </div>
            ))}
      </div>
      {cartClicked && <Cart />}
      {isLoading && <Loader />}
    </main>
  );
}

export default Shop;
