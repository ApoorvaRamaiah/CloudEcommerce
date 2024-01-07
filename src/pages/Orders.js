import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { Footer, Navbar } from '../components';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/order');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, []); 




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
      dataIndex: ['cart', 'user', 'userId'], 
      key: 'cart.user.userId',
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
