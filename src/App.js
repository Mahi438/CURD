import { useState } from "react";
import { ProductProvider } from "./ProductContext";
import Login from "./Login";
import MyProducts from "./MyProducts";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const handleLogin = () => setLoggedIn(true);

  return (
    <ProductProvider>
      {!loggedIn ? <Login onLogin={handleLogin}/> : <MyProducts/>}
    </ProductProvider>
  );
}

export default App;