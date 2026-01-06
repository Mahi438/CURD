import { createContext, useState, useEffect } from "react";
import API from "./api";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const addProduct = async (product) => {
    try {
      const res = await API.post("/products", product);
      setProducts([...products, res.data]);
    } catch { alert("Error adding product"); }
  };

  const updateProduct = async (product) => {
    try {
      const res = await API.put(/products/`${product.id}`, product);
      setProducts(products.map(p => p.id === product.id ? res.data : p));
    } catch { alert("Error updating product"); }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch { alert("Error deleting product"); }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};