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

// import React, { useState } from 'react';
// import { Table, Button, Input, Upload, message, Popconfirm } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import image from './images/shopping.png'
// import './ProductList.css'; // Import the CSS file
// const ProductList = () => {
//   const [products, setProducts] = useState([
//     { id: 1, name: 'Product 1', price: '$10', image: image },
//     { id: 2, name: 'Product 2', price: '$20', image: image },
//     // Add more initial products as needed
//   ]);

//   const [currentProduct, setCurrentProduct] = useState({
//     id: '',
//     name: '',
//     price: '',
//     image: '',
//   });

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Image',
//       dataIndex: 'image',
//       key: 'image',
//       render: (text, record) => (
//         <img src={text} alt={`Product ${record.id}`} style={{ maxWidth: '50px', maxHeight: '50px' }} />
//       ),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <span>
//           <Button type="link" onClick={() => handleEditProduct(record)}>
//             Edit
//           </Button>
//           <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteProduct(record.id)}>
//             <Button type="link" danger>
//               Delete
//             </Button>
//           </Popconfirm>
//         </span>
//       ),
//     },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentProduct({ ...currentProduct, [name]: value });
//   };

//   const handleAddProduct = () => {
//     setProducts([...products, { ...currentProduct, id: products.length + 1 }]);
//     setCurrentProduct({ id: '', name: '', price: '', image: '' });
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   const handleEditProduct = (product) => {
//     setCurrentProduct(product);
//   };

//   const handleUpdateProduct = () => {
//     setProducts(products.map((p) => (p.id === currentProduct.id ? currentProduct : p)));
//     setCurrentProduct({ id: '', name: '', price: '', image: '' });
//   };

//   const uploadProps = {
//     name: 'file',
//     showUploadList: false,
//     beforeUpload: (file) => {
//       // Validate file type
//       const isImage = file.type.startsWith('image/');
//       if (!isImage) {
//         message.error('You can only upload image files!');
//       } else {
//         // Display image preview
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//           setCurrentProduct({ ...currentProduct, image: reader.result });
//         };
//       }
//       return false; // Prevent default upload behavior
//     },
//   };

//   return (
//     <div className="container my-3 py-3">
//       <h1>Product List</h1>
//       <Table dataSource={products} columns={columns} rowKey="id" />

//       <div style={{ margin: '20px 0', display: 'flex',  }}>
//         <Input
//           placeholder="Product Name"
//           name="name"
//           value={currentProduct.name}
//           onChange={handleInputChange}
//         />
//         <Input
//           placeholder="Product Price"
//           name="price"
//           value={currentProduct.price}
//           onChange={handleInputChange}
//         />
//         <Upload {...uploadProps}>
//           <Button icon={<UploadOutlined />}>Upload Image</Button>
//         </Upload>
//         {currentProduct.id ? (
//           <Button type="primary" onClick={handleUpdateProduct}>
//             Update Product
//           </Button>
//         ) : (
//           <Button type="primary" onClick={handleAddProduct}>
//             Add Product
//           </Button>
//         )}
//         {currentProduct.id ? (
//           <Button type="primary" onClick={handleUpdateProduct}>
//             Update Product
//           </Button>
//         ) : (
//           <Button type="primary" onClick={handleAddProduct}>
//             Add Product
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Input, Upload, message, Popconfirm } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import './ProductList.css'; // Import the CSS file

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [currentProduct, setCurrentProduct] = useState({
//     productId: '',
//     productName: '',
//     productQuantity: 0,
//     productPrice: 0,
//     productType: '',
//     productImage: '',
//     productDescription: '',
//     orderId: '', // Add orderId property
//   });
//   const [orderId, setOrderId] = useState('');

//   useEffect(() => {
//     // Fetch products from API when component mounts
//     fetch('http://localhost:8080/product')
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   const columns = [
//     {
//       title: 'Product ID',
//       dataIndex: 'productId',
//       key: 'productId',
//     },
//     {
//       title: 'Product Name',
//       dataIndex: 'productName',
//       key: 'productName',
//     },
//     {
//       title: 'Product Quantity',
//       dataIndex: 'productQuantity',
//       key: 'productQuantity',
//     },
//     {
//       title: 'Product Price',
//       dataIndex: 'productPrice',
//       key: 'productPrice',
//     },
//     {
//       title: 'Product Type',
//       dataIndex: 'productType',
//       key: 'productType',
//     },
//     {
//       title: 'Product Image',
//       dataIndex: 'productImage',
//       key: 'productImage',
//       render: (text, record) => (
//         <img src={text} alt={`Product ${record.productId}`} style={{ maxWidth: '50px', maxHeight: '50px' }} />
//       ),
//     },
//     {
//       title: 'Product Description',
//       dataIndex: 'productDescription',
//       key: 'productDescription',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <span>
//           <Button type="link" onClick={() => handleEditProduct(record)}>
//             Edit
//           </Button>
//           <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteProduct(record.productId)}>
//             <Button type="link" danger>
//               Delete
//             </Button>
//           </Popconfirm>
//         </span>
//       ),
//     },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentProduct({ ...currentProduct, [name]: value });
//   };

//   // const handleAddProduct = () => {
//   //   // Send a POST request to add a new product
//   //   fetch('http://localhost:8080/product', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify(currentProduct),
//   //   })
//   //     .then((response) => response.json())
//   //     .then((newProduct) => {
//   //       setProducts([...products, newProduct]);
//   //       setCurrentProduct({
//   //         productId: '',
//   //         productName: '',
//   //         productQuantity: 0,
//   //         productPrice: 0,
//   //         productType: '',
//   //         productImage: '',
//   //         productDescription: '',
//   //       });
//   //       message.success('Product added successfully!');
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error adding product:', error);
//   //       message.error('Error adding product. Please try again.');
//   //     });
//   // };
//   const handleAddProduct = () => {
//     // Send a POST request to add a new product
//     const newProduct = {
//       ...currentProduct,
//       id: products.length + 1,
//     };

//     // Add the order ID to the product
//     newProduct.orderId = orderId;

//     fetch('http://localhost:8080/product', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newProduct),
//     })
//       .then((response) => response.json())
//       .then((addedProduct) => {
//         setProducts([...products, addedProduct]);
//         setCurrentProduct({
//           productId: '',
//           productName: '',
//           productQuantity: 0,
//           productPrice: 0,
//           productType: '',
//           productImage: '',
//           productDescription: '',
//         });
//         setOrderId(''); // Clear order ID after adding a product
//         message.success('Product added successfully!');
//       })
//       .catch((error) => {
//         console.error('Error adding product:', error);
//         message.error('Error adding product. Please try again.');
//       });
//   };

//   const handleDeleteProduct = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:8080/product/${id}`, {
//             method: 'DELETE',
//         });

//         if (!response.ok) {
//             throw new Error(`Error deleting product: ${response.statusText}`);
//         }

//         // Update state or perform any other actions after successful deletion
//         console.log(`Product with ID ${id} deleted successfully`);
//         alert(`Product with ID ${id} deleted successfully`)

//     } catch (error) {
//         console.error('Error deleting product:', error.message); // Log the error message
//     }
// };


//   const handleEditProduct = (product) => {
//     setCurrentProduct(product);
//   };

//   const handleUpdateProduct = () => {
//     // Send a PUT request to update the product
//     const updatedProduct = { ...currentProduct };

//     // Add the order ID to the product
//     updatedProduct.orderId = orderId;

//     fetch(`http://localhost:8080/product/${updatedProduct.productId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedProduct),
//     })
//       .then((response) => response.json())
//       .then((updatedProduct) => {
//         setProducts(products.map((p) => (p.productId === updatedProduct.productId ? updatedProduct : p)));
//         setCurrentProduct({
//           productId: '',
//           productName: '',
//           productQuantity: 0,
//           productPrice: 0,
//           productType: '',
//           productImage: '',
//           productDescription: '',
//         });
//         setOrderId(''); // Clear order ID after updating a product
//         message.success('Product updated successfully!');
//       })
//       .catch((error) => {
//         console.error('Error updating product:', error);
//         message.error('Error updating product. Please try again.');
//       });
//   };

//   const uploadProps = {
//     name: 'file',
//     showUploadList: false,
//     beforeUpload: (file) => {
//       // Validate file type
//       const isImage = file.type.startsWith('image/');
//       if (!isImage) {
//         message.error('You can only upload image files!');
//       } else {
//         // Display image preview
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//           setCurrentProduct({ ...currentProduct, productImage: reader.result });
//         };
//       }
//       return false; // Prevent default upload behavior
//     },
//   };

//   return (
//     <div className="container my-3 py-3">
//       <h1>Product List</h1>
//       <Table dataSource={products} columns={columns} rowKey="productId" />

//       <div style={{ margin: '20px 0', display: 'flex', }}>
//         <Input
//           placeholder="Product ID"
//           name="productId"
//           value={currentProduct.productId}
//           onChange={handleInputChange}
//         />
//         <Input
//           placeholder="Product Name"
//           name="productName"
//           value={currentProduct.productName}
//           onChange={handleInputChange}
//         />
//         <Input
//           placeholder="Product Quantity"
//           name="productQuantity"
//           value={currentProduct.productQuantity}
//           onChange={handleInputChange}
//         />
//         <Input
//           placeholder="Product Price"
//           name="productPrice"
//           value={currentProduct.productPrice}
//           onChange={handleInputChange}
//         />
//         <Input
//           placeholder="Product Type"
//           name="productType"
//           value={currentProduct.productType}
//           onChange={handleInputChange}
//         />
//         <Input
//           placeholder="Product Description"
//           name="productDescription"
//           value={currentProduct.productDescription}
//           onChange={handleInputChange}
//         />
//         <Upload {...uploadProps}>
//           <Button icon={<UploadOutlined />}>Upload Image</Button>
//         </Upload>
//         {currentProduct.productId ? (
//           <Button type="primary" onClick={handleUpdateProduct}>
//             Update Product
//           </Button>
//         ) : (
//           <Button type="primary" onClick={handleAddProduct}>
//             Add Product
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Upload, message, Popconfirm } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './ProductList.css'; // Import the CSS file
import { Footer, Navbar } from "../components";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    productId: '',
    productName: '',
    productQuantity: 0,
    productPrice: 0,
    productType: '',
    productImage: '',
    productDescription: '',
  });
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Fetch products from API when component mounts
    fetch('http://localhost:8080/product')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Product Quantity',
      dataIndex: 'productQuantity',
      key: 'productQuantity',
    },
    {
      title: 'Product Price',
      dataIndex: 'productPrice',
      key: 'productPrice',
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      key: 'productType',
    },
    {
      title: 'Product Image',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (text, record) => (
        <img src={text} alt={`Product ${record.productId}`} style={{ maxWidth: '50px', maxHeight: '50px' }} />
      ),
    },
    {
      title: 'Product Description',
      dataIndex: 'productDescription',
      key: 'productDescription',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeleteProduct(record.productId)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
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
  const generateOrderId = () => {
    // You can implement your own logic to generate a unique order ID here
    // For simplicity, using a timestamp as an example
    return `ORDER-${Date.now()}`;
  };

  const handleAddProduct = () => {
    // Send a POST request to add a new product
    const newProduct = {
      ...currentProduct,
      productId: products.length + 1, // Automatically increase product ID
      // orderId: orderId,
      orderId: generateOrderId(), // Generate and assign order ID
    };

    fetch('http://localhost:8080/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((addedProduct) => {
        setProducts([...products, addedProduct]);
        setCurrentProduct({
          productId: '',
          productName: '',
          productQuantity: 0,
          productPrice: 0,
          productType: '',
          productImage: '',
          productDescription: '',
        });
        setOrderId(''); // Clear order ID after adding a product
        message.success('Product added successfully!');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        message.error('Error adding product. Please try again.');
      });
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/product/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting product: ${response.statusText}`);
      }

      // Update state or perform any other actions after successful deletion
      setProducts(products.filter((product) => product.productId !== id));
      console.log(`Product with ID ${id} deleted successfully`);
      message.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error.message); // Log the error message
      message.error('Error deleting product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
  };

  // const handleUpdateProduct = () => {
  //   // Send a PUT request to update the product
  //   const updatedProduct = { ...currentProduct, orderId: orderId };

  //   fetch(`http://localhost:8080/product/${updatedProduct.productId}/update-details`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedProduct),
  //   })
  //     // .then((response) => response.json())
  //     .then((response) => {
  //       if (!response.ok) {
  //         console.log("res", response)
  //         throw new Error(`Error updating product: ${response.statusText}`);
  //       }
  //       return response.json(); // Handle non-JSON responses if needed
  //       return response.text();
  //     })
  //     .then((responseText) => {
  //       // Parse the response if it is JSON
  //       const updatedProduct = JSON.parse(responseText);
  //       // ...
  //     })
  //     .then((updatedProduct) => {
  //       setProducts(
  //         products.map((p) => (p.productId === updatedProduct.productId ? updatedProduct : p))
  //       );
  //       setCurrentProduct({
  //         productId: '',
  //         productName: '',
  //         productQuantity: 0,
  //         productPrice: 0,
  //         productType: '',
  //         productImage: '',
  //         productDescription: '',
  //       });
  //       setOrderId(''); // Clear order ID after updating a product
  //       message.success('Product updated successfully!');
  //     })
  //     .catch((error) => {
  //       console.error('Error updating product:', error);
  //       message.error('Error updating product. Please try again.');
  //     });
  // };
  const handleUpdateProduct = () => {
    // Send a PUT request to update the product
    const updatedProduct = { ...currentProduct, orderId: orderId };
    if (!updatedProduct.orderId) {
      updatedProduct.orderId = generateOrderId(); // Generate and assign order ID
    }

    fetch(`http://localhost:8080/product/${updatedProduct.productId}/update-details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(async (response) => {
        // Log raw response
        console.log('Raw response:', await response);

        if (!response.ok) {
          throw new Error(`Error updating product: ${response.statusText}`);
        }

        // Parse JSON data
        return response.json();
      })
      .then((updatedProduct) => {
        // Handle the updated product
        setProducts(
          products.map((p) => (p.productId === updatedProduct.productId ? updatedProduct : p))
        );
        setCurrentProduct({
          // productId: '',
          productName: '',
          productQuantity: 0,
          productPrice: 0,
          productType: '',
          productImage: '',
          productDescription: '',
        });
        setOrderId(''); // Clear order ID after updating a product
        message.success('Product updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        message.error('Error updating product. Please try again.');
      });
  };
  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      // Assuming the server responds with the uploaded image URL
      const imageUrl = info.file.response.url;
      setCurrentProduct({ ...currentProduct, productImage: imageUrl });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadProps = {
    name: 'file',
    showUploadList: false,
    beforeUpload: (file) => {
      // Validate file type
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      else {
        // Display image preview
        const reader = new FileReader();
        const { name, path } = file;
        console.log('File name:', name);
        console.log('File path:', path);
        reader.onloadend = () => {
          // Use the File object to get file information
          const { name, path } = file;
          console.log('File name:', name);
          console.log('File path:', this.state.path);
          setCurrentProduct({
            ...currentProduct, productImage: reader.result, productFileName: `$
      {name}` });
        };

        // const imagePath = path || name;

        //     reader.readAsDataURL(file);
        //     reader.onloadend = () => {
        //       setCurrentProduct({ ...currentProduct, productImage: reader.result });
        //     };
      }
      // Use the File object to get file information
      //   const { name, path } = file;
      //   console.log('File name:', name);
      //   console.log('File path:', path);

      //   // Use the local path (if available) or the file name
      //   const imagePath = path || name;

      //   setCurrentProduct({ ...currentProduct, productImage: imagePath });
      //   return false; // Prevent default upload behavior
      // },
      // return false; // Prevent default upload behavior
    },
  };
  // const uploadProps = {
  //   name: 'file',
  //   action: http://localhost:8080/product/{productId}/update-details', // Replace with your upload API endpoint
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange: handleUploadChange,
  // };
  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1>Product List</h1>
        <Table dataSource={products} columns={columns} rowKey="productId" />

        <div style={{ margin: '20px 0', display: 'flex' }}>
          {/* <Input
          placeholder="Product ID"
          name="productId"
          value={currentProduct.productId}
          onChange={handleInputChange}
        /> */}
          <Input
            placeholder="Product Name"
            name="productName"
            value={currentProduct.productName}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Product Quantity"
            name="productQuantity"
            value={currentProduct.productQuantity}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Product Price"
            name="productPrice"
            value={currentProduct.productPrice}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Product Type"
            name="productType"
            value={currentProduct.productType}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Product Description"
            name="productDescription"
            value={currentProduct.productDescription}
            onChange={handleInputChange}
          />
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {currentProduct.productId ? (
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
      <Footer />
    </>
  );
};

export default ProductList;
