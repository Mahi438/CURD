import { useState, useEffect } from "react";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null); // edit mode

  // Load products from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myProducts")) || [];
    setProducts(saved);
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("myProducts", JSON.stringify(products));
  }, [products]);

  // Add or Update product
  const handleSubmit = () => {
    if (!title || !price || !description) return alert("All fields required");

    if (editId !== null) {
      // Edit product
      const updated = products.map(p =>
        p.id === editId ? { ...p, title, price, description } : p
      );
      setProducts(updated);
      setEditId(null);
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        title,
        price,
        description
      };
      setProducts([...products, newProduct]);
    }

    setTitle("");
    setPrice("");
    setDescription("");
  };

  // Edit product
  const handleEdit = (p) => {
    setEditId(p.id);
    setTitle(p.title);
    setPrice(p.price);
    setDescription(p.description);
  };

  // Delete product
  const handleDelete = (id) => {
    const filtered = products.filter(p => p.id !== id);
    setProducts(filtered);
  };

  return (
    <div className="container mt-4">
      <h3>My Products (CRUD)</h3>

      {/* Form */}
      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Product title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="col">
          <button className="btn btn-success w-100" onClick={handleSubmit}>
            {editId !== null ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>₹ {p.price}</td>
              <td>{p.description}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No products added</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyProducts;