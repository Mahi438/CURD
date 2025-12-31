import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

function ApiProducts() {
  const [apiProducts, setApiProducts] = useState([]);

  // 👇 context se My Products le rahe hain
  const { products: myProducts } = useContext(ProductContext);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setApiProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      {/* ================= API PRODUCTS ================= */}
      <h3 className="mb-3">API Products</h3>
      <div className="row">
        {apiProducts.map((p) => (
          <div className="col-md-3 mb-3" key={p.id}>
            <div className="card h-100">
              <img
                src={p.image}
                className="card-img-top p-3"
                height="300"
                alt={p.title}
              />
              <div className="card-body">
                <h6>{p.title}</h6>
                <p>₹ {p.price}</p>
                <small>{p.category}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      {/* ================= MY PRODUCTS ================= */}
      <h3 className="mb-3">My Products (Context)</h3>

      {myProducts.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApiProducts;