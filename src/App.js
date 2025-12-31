import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ApiProducts from "./ApiProducts";
import MyProducts from "./MyProducts";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Product App</Link>
        <div>
          <Link className="btn btn-light me-2" to="/">API Products</Link>
          <Link className="btn btn-warning" to="/my-products">My Products</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ApiProducts />} />
        <Route path="/my-products" element={<MyProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;