// import React, { useEffect, useState } from 'react';
// import { Table, Button, Space, Modal } from 'antd';

// const Orders = () => {
//   const [orders, setOrders] = useState([
//     // {
//     //   key: '1',
//     //   userId: 'user123',
//     //   amount: 150.5,
//     //   itemsRequested: ['item1', 'item2'],
//     //   shipment: 'In Progress',
//     // },
//     // {
//     //   key: '2',
//     //   userId: 'user456',
//     //   amount: 200.25,
//     //   itemsRequested: ['item3', 'item4'],
//     //   shipment: 'Pending',
//     // },
//     // Add more orders as needed
//   ]);
//   useEffect(() => {
//     // Fetch orders from the API when the component mounts
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/order');
//         const data = await response.json();
//         console.log("data",data, response)
//         setOrders(data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []); // Empty dependency array ensures the effect runs only once on mount

//   const columns = [
//     {
//       title: 'User ID',
//     dataIndex: ['cart', 'user', 'userId'], // Adjusted to access nested property
//     key: 'cart.user.userId', // Key should match the dataIndex
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//     },
//     // ...
// {
//   title: 'Items Requested',
//   dataIndex: 'cart',
//   key: 'cart',
//   render: (cart) => (
//     <ul>
//       <li key={cart.id}>
//         {cart.product.productName} - Quantity: {cart.quantity}
//       </li>
//     </ul>
//   ),
// },
// // ...

//     // {
//     //   title: 'Items Requested',
//     //   dataIndex: 'cart',
//     //   key: 'cart',
//     //   render: (cart) => {
//     //     if (Array.isArray(cart)) {
//     //       return (
//     //         <ul>
//     //           {cart.map((item, index) => (
//     //             <li key={index}>{item.product.productName} - Quantity: {item.quantity}</li>
//     //           ))}
//     //         </ul>
//     //       );
//     //     } else {
//     //       return <span>No items requested</span>;
//     //     }
//     //   },
//     // },
//     {
//       title: 'Shipment',
//       dataIndex: 'shipment',
//       key: 'shipment',
//       render: (text, record) => (
//         <Space size="middle">
//           {text === 'false' && (
//             <Button onClick={() => handleShipment(record)}>Initiate Shipment</Button>
//           )}
//           {text !== 'false' && (
//             <Button disabled>Shipment In Progress</Button>
//           )}
//         </Space>
//       ),
//     },
//   ];

//   // const handleShipment = (record) => {
//   //   // Customize this function to perform actions like initiating shipment
//   //   Modal.confirm({
//   //     title: 'Initiate Shipment',
//   //     content: `Initiate shipment for Order ${record.key}?`,
//   //     onOk() {
//   //       // Logic to initiate shipment
//   //       console.log(`Shipment initiated for Order ${record.key}`);
//   //       // Update the orders data accordingly
//   //       const updatedOrders = orders.map((order) => {
//   //         if (order.key === record.key) {
//   //           return { ...order, shipment: 'In Progress' };
//   //         }
//   //         return order;
//   //       });
//   //       setOrders(updatedOrders);
//   //     },
//   //   });
//   // };

//   const handleShipment = (record) => {
//     // Customize this function to perform actions like initiating shipment
//     Modal.confirm({
//       title: 'Initiate Shipment',
//       content: `Initiate shipment for Order ${record.orderId}?`,
//       onOk() {
//         // Logic to initiate shipment
//         console.log(`Shipment initiated for Order ${record.orderId}`);
//         // Update the orders data accordingly
//         const updatedOrders = orders.map((order) => {
//           if (order.orderId === record.orderId) {
//             return { ...order, shipped: true };
//           }
//           return order;
//         });
//         setOrders(updatedOrders);
//       },
//     });
//   };
//   return (
//     <Table
//       dataSource={orders}
//       columns={columns}
//       pagination={false}
//       bordered
//       size="middle"
//     />
//   );
// };

// export default Orders;
import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { Footer, Navbar } from '../components';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   // Fetch orders from the API when the component mounts
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/order');
  //       const data = await response.json();
  //       setOrders(data);
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //     }
  //   };

  //   fetchOrders();
  // }, []); 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/order');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Set loading to false whether the fetch is successful or not
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures the effect runs only once on mount



  // const handleShipment = async (record) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/order/${record.orderId}/update-shipped?shipped=true`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // body: JSON.stringify({
  //       //   shipped: true, // or false based on your logic
  //       // }),
  //     });
  //     // window.location.reload();
  //     const responseData = await response.json();
  //     console.log('Server Response:', responseData);
  //     console.log('Request Payload:', JSON.stringify({ shipped: true }));

  //     if (response.ok) {
  //       // Handle the successful response, update state, etc.
  //       console.log('Shipment status updated successfully!');
  //       alert('Shipment status updated successfully!')
  //     } else {
  //       // Log the error message and status code
  //       console.error('Error updating shipment status:', responseData);
  //       alert('Error updating shipment status:', responseData);
  //       console.error('Response Status Code:', response.status);
  //       // You can also throw an error here if you want to propagate it further
  //     }
  //   } catch (error) {
  //     // Log and handle unexpected errors
  //     console.error('Error updating shipment status:', error);
  //   }
  // };
  
  const handleShipment = async (record) => {
    try {
      const response = await fetch(`http://localhost:8080/order/${record.orderId}/update-shipped?shipped=true`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const responseData = await response.json();
      console.log('Server Response:', responseData);
  
      if (!response.ok) {
        console.error('Error updating shipment status:', responseData);
        console.error('Response Status Code:', response.status);
        alert('Error updating shipment status: ' + responseData.error || 'Unknown error');
      } else {
        // Update the UI state to reflect the shipment status
        setOrders(prevOrders => {
          return prevOrders.map(order => {
            if (order.orderId === record.orderId) {
              return { ...order, shipped: true };
            }
            return order;
          });
        });
        alert('Shipment status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating shipment status:', error);
      alert('Error updating shipment status: ' + error.message || 'Unknown error');
    }
  };
  
  const columns = [
    {
      title: 'User ID',
      dataIndex: ['cart', 'user', 'userId'], // Adjusted to access nested property
      key: 'cart.user.userId', // Key should match the dataIndex
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Items Requested',
      dataIndex: 'cart',
      key: 'cart',
      render: (cart) => (
        <ul>
          <li key={cart?.product?.productId}>
            {cart?.product?.productName} - Quantity: {cart?.quantity}
          </li>
        </ul>
      ),
    },
    {
      title: 'Shipment',
      dataIndex: 'shipped',
      key: 'shipped',
      render: (shipped, record) => (
        <Space size="middle">
          {!shipped && (
            <Button onClick={() => handleShipment(record)}>Initiate Shipment</Button>
          )}
          {shipped && (
            <Button disabled>Shipment In Progress</Button>
          )}
        </Space>
      ),
    },
  ];
  // const handleShipment = async (record) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/order/${record.orderId}/update-shipped?shipped=true`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const responseData = await response.json();
  //     console.log('Server Response:', responseData);
  //     console.log('Request Payload:', 'No payload for this request');

  //     if (!response.ok) {
  //       // Log the error message and status code
  //       console.error('Error updating shipment status:', responseData);
  //       console.error('Response Status Code:', response.status);
  //       // You can also throw an error here if you want to propagate it further
  //     } else {
  //       // Handle the successful response, update state, etc.
  //       console.log('Shipment status updated successfully!');
  //     }
  //   } catch (error) {
  //     // Log and handle unexpected errors
  //     console.error('Error updating shipment status:', error);
  //   }
  // };



  return (
    <>
    <Navbar/>
      <div className="container my-3 py-3">
      <h2>Orders Tables</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          pagination={false}
          bordered
          size="middle"
          rowKey="orderId"
        />
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Orders;
