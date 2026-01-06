import { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

function MyProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [form, setForm] = useState({ id: null, title: "", price: "", description: "" });

  const handleSubmit = e => {
    e.preventDefault();
    if (form.id) updateProduct(form);
    else addProduct(form);
    setForm({ id: null, title: "", price: "", description: "" });
  };

  return (
    <div className="container mt-4">
      <h2>My Products</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}/>
        <input className="form-control mb-2" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}/>
        <textarea className="form-control mb-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}/>
        <button className="btn btn-success">{form.id ? "Update" : "Add"} Product</button>
      </form>

      <table className="table table-bordered mt-4">
        <thead>
          <tr><th>Title</th><th>Price</th><th>Description</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setForm(p)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyProducts;