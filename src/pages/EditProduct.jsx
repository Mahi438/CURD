import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`).then(res => {
      setName(res.data.name);
      setPrice(res.data.price);
    });
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    await API.put(`/products/${id}`, { name, price });
    navigate("/products");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="card-title mb-3 text-center">Edit Product</h3>
            <form onSubmit={update}>
              <div className="mb-3">
                <input 
                  className="form-control" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Product Name" 
                  required
                />
              </div>
              <div className="mb-3">
                <input 
                  type="number" 
                  className="form-control" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  placeholder="Price" 
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}