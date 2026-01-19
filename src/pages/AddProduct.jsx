import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

 const submit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/api/products", { name, price }); // <-- /api added
    navigate("/products");
  } catch (err) {
    console.error(err);
    alert("Failed to add product");
  }
};
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="card-title mb-3 text-center">Add Product</h3>
            <form onSubmit={submit}>
              <div className="mb-3">
                <input 
                  className="form-control" 
                  placeholder="Name" 
                  onChange={e => setName(e.target.value)} 
                  required
                />
              </div>
              <div className="mb-3">
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Price" 
                  onChange={e => setPrice(e.target.value)} 
                  required
                />
              </div>
              <button className="btn btn-success w-100" type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}