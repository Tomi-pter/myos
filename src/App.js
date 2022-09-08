import Shop from "./components/Shop";
import { ShopProvider } from "./context/ShopContext";

function App() {
  return (
    <ShopProvider>
      <Shop />
    </ShopProvider>
  );
}

export default App;
