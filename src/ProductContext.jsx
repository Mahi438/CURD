import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // products state (global)
  const [products, setProducts] = useState([]);

  // page refresh ke baad bhi data rahe
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("myProducts"));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  // localStorage update
  useEffect(() => {
    localStorage.setItem("myProducts", JSON.stringify(products));
  }, [products]);

  // ADD
  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  // DELETE
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // EDIT
  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};