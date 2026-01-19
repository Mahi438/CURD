import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  API.get("/api/products").then(res => setProducts(res.data));
}, []);

const deleteProduct = async (id) => {
  await API.delete(`/api/products/${id}`);
  setProducts(products.filter(p => p._id !== id));
};

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <Link to="/add" className="btn btn-success">Add Product</Link>
      </div>

      <div className="row">
        {products.map(p => (
          <div className="col-md-4 mb-3" key={p._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">₹{p.price}</p>
                <Link to={`/edit/${p._id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(p._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}