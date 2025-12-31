import axios from "axios";
import { useEffect, useState } from "react";

function ApiProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>API Products</h3>

      <div className="row">
        {products.map(p => (
          <div className="col-md-3 mb-3" key={p.id}>
            <div className="card h-100">
              <img src={p.image} className="card-img-top p-3" height="400" alt={p.title} />
              <div className="card-body">
                <h6>{p.title}</h6>
                <p>₹ {p.price}</p>
                <small>{p.category}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiProducts;