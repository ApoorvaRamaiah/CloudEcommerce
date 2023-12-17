import React, { useState } from 'react';
import '../App.css';

const initialProduct = { id: '', name: '', price: '' };

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
    // Add more initial products as needed
  ]);

  const [currentProduct, setCurrentProduct] = useState(initialProduct);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
    setCurrentProduct(initialProduct);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
  };

  const handleUpdateProduct = () => {
    setProducts(products.map((p) => (p.id === currentProduct.id ? currentProduct : p)));
    setCurrentProduct(initialProduct);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Product List</h1>
      <table className="app-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="app-edit" onClick={() => handleEditProduct(product)}>
                  Edit
                </button>
                <button className="app-delete" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="app-form">
        <h2 className="app-form-title">Add / Update Product</h2>
        <label>
          Name:
          <input type="text" name="name" value={currentProduct.name} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={currentProduct.price} onChange={handleInputChange} />
        </label>
        {currentProduct.id ? (
          <button className="app-update" onClick={handleUpdateProduct}>Update</button>
        ) : (
          <button className="app-add" onClick={handleAddProduct}>Add</button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
