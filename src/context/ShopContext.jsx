import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [itemsSearch, setItemsSearch] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);

  const addToCart = (title, price, image, productId) => {
    let duplicate;
    let cart = { title, price, image, productId, quantity: 1 };

    if (cartItems.length === 0) {
      setCartItems([...cartItems, cart]);
    } else if (cartItems.length > 0) {
      duplicate = cartItems.findIndex((item) => item.productId === productId);
      let duplicateArr = JSON.parse(JSON.stringify(cartItems));

      if (duplicate !== -1) {
        cart.quantity += 1;
        duplicateArr.splice(duplicate, 1, cart);
        setCartItems(duplicateArr);
      } else {
        setCartItems([...cartItems, cart]);
      }
    }
  };

  const handleSearchChange = (e) => {
    setItemsSearch(e.target.value);
  };

  const [cartClicked, setCartClicked] = useState(false);

  const handleCartClicked = () => {
    setCartClicked(!cartClicked);
  };

  const handleOrderCompleted = (cartItems) => {
    // let products = cartItems.map(({ productId, quantity }) => ({
    //   productId,
    //   quantity,
    // }));

    // const addOrder = async () => {
    //   const res = await fetch("https://fakestoreapi.com/carts", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       userId: uuidv4(),
    //       date: today,
    //       products: products,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   setOrders([...orders, data]);
    // };

    // addOrder();

    let orderId = uuidv4();
    setOrders([...orders, { cartItems, orderId }]);
    setCartItems([]);
  };

  return (
    <ShopContext.Provider
      value={{
        items,
        cartItems,
        itemsSearch,
        cartClicked,
        orders,
        setCartItems,
        setItemsSearch,
        addToCart,
        handleSearchChange,
        setCartClicked,
        handleCartClicked,
        handleOrderCompleted,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
