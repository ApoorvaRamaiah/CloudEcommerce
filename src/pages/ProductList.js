// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import '../App.css';

// const initialProduct = { id: '', name: '', price: '', status: 'pending', image: null };

// const ProductList = () => {
//   const [products, setProducts] = useState([
//     { id: 1, name: 'Product 1', price: '$10', status: 'pending', image: null },
//     { id: 2, name: 'Product 2', price: '$20', status: 'pending', image: null },
//     // Add more initial products as needed
//   ]);

//   const [currentProduct, setCurrentProduct] = useState(initialProduct);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentProduct({ ...currentProduct, [name]: value });
//   };

//   const handleAddProduct = () => {
//     setProducts([
//       ...products,
//       { ...currentProduct, id: products.length + 1, status: 'pending', image: null },
//     ]);
//     setCurrentProduct(initialProduct);
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   const handleEditProduct = (product) => {
//     setCurrentProduct(product);
//   };

//   const handleUpdateProduct = () => {
//     setProducts(products.map((p) => (p.id === currentProduct.id ? currentProduct : p)));
//     setCurrentProduct(initialProduct);
//   };

//   const handleShipProduct = (id) => {
//     const product = products.find((p) => p.id === id);

//     if (product.status === 'pending') {
//       console.log(`Product with ID ${id} has been shipped.`);

//       setProducts((prevProducts) =>
//         prevProducts.map((p) => (p.id === id ? { ...p, status: 'shipped' } : p))
//       );
//     }
//   };

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = () => {
//         setCurrentProduct({ ...currentProduct, image: { file, preview: reader.result } });
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: 'image/jpeg, image/jpg, image/png, image/gif',
//     multiple: false,
//   });

//   return (
//     <div className="app-container">
//       <h1 className="app-title">Product List</h1>
//       <table className="app-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Image</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//               <td>
//                 {product.image && (
//                   <img src={product.image.preview} alt="Product" style={{ width: '50px' }} />
//                 )}
//                 <div {...getRootProps()} style={{ cursor: 'pointer', marginTop: '5px' }}>
//                   <input {...getInputProps()} />
//                   Drag & Drop or Click to upload
//                 </div>
//               </td>
//               <td>{product.status}</td>
//               <td>
//                 <button className="app-edit" onClick={() => handleEditProduct(product)}>
//                   Edit
//                 </button>
//                 <button className="app-delete" onClick={() => handleDeleteProduct(product.id)}>
//                   Delete
//                 </button>
//                 {product.status === 'pending' && (
//                   <button className="app-ship" onClick={() => handleShipProduct(product.id)}>
//                     Ship Now
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="app-form">
//         <h2 className="app-form-title">Add / Update Product</h2>
//         <label>
//           Name:
//           <input type="text" name="name" value={currentProduct.name} onChange={handleInputChange} />
//         </label>
//         <label>
//           Price:
//           <input type="text" name="price" value={currentProduct.price} onChange={handleInputChange} />
//         </label>
//         {currentProduct.id ? (
//           <button className="app-update" onClick={handleUpdateProduct}>
//             Update
//           </button>
//         ) : (
//           <button className="app-add" onClick={handleAddProduct}>
//             Add
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState } from 'react';
import { Table, Button, Input, Upload, message, Popconfirm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import image from './images/shopping.png'
import './ProductList.css'; // Import the CSS file
const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: '$10', image: image },
    { id: 2, name: 'Product 2', price: '$20', image: image },
    // Add more initial products as needed
  ]);

  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    price: '',
    image: '',
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img src={text} alt={`Product ${record.id}`} style={{ maxWidth: '50px', maxHeight: '50px' }} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEditProduct(record)}>
            Edit
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteProduct(record.id)}>
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
    setCurrentProduct({ id: '', name: '', price: '', image: '' });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
  };

  const handleUpdateProduct = () => {
    setProducts(products.map((p) => (p.id === currentProduct.id ? currentProduct : p)));
    setCurrentProduct({ id: '', name: '', price: '', image: '' });
  };

  const uploadProps = {
    name: 'file',
    showUploadList: false,
    beforeUpload: (file) => {
      // Validate file type
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      } else {
        // Display image preview
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setCurrentProduct({ ...currentProduct, image: reader.result });
        };
      }
      return false; // Prevent default upload behavior
    },
  };

  return (
    <div className="container my-3 py-3">
      <h1>Product List</h1>
      <Table dataSource={products} columns={columns} rowKey="id" />

      <div style={{ margin: '20px 0', display: 'flex',  }}>
        <Input
          placeholder="Product Name"
          name="name"
          value={currentProduct.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Product Price"
          name="price"
          value={currentProduct.price}
          onChange={handleInputChange}
        />
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        {currentProduct.id ? (
          <Button type="primary" onClick={handleUpdateProduct}>
            Update Product
          </Button>
        ) : (
          <Button type="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductList;

