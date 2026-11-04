import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style2.css';
import { formatKshFromInr } from '../utils/currency';

function VendorOrders() {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://gmart-supermarket.vercel.app/allVendor');
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [orders]);

  const handleDispatch = async (orderId) => {
    try {
      const response = await axios.put(`https://gmart-supermarket.vercel.app/updateStage/${orderId}`, { orderStage: 2});
      console.log(response);
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='vendor-container'>
      <h1 className='vendor-heading text-3xl text-bold text-ellipsis text-pretty text'>Orders</h1>
      <div className='vendor-table-container'>
        <table className='vendor-orders-table'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Address and Postal Code</th>
              <th>Delivery Type</th>
              <th>Date</th>
              <th>Products</th>
              <th>Action</th>
              <th>Order Stage</th>
              <th>Rating and Feedback</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td className="vendor-nowrap">{order.id}</td>
                <td className="vendor-nowrap">{order.address} {order.pinCode}</td>
                <td className="vendor-nowrap">{order.deliveryType}</td>
                <td className="vendor-nowrap">{order.date}</td>
                <td>
                  <table className='vendor-products-table'>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.order.map(product => (
                        <tr key={product._id}>
                          <td><img src={product.imageUrl} alt={product.productName} className='vendor-product-image' /></td>
                          <td>{product.productName}</td>
                          <td>{formatKshFromInr(product.discountPrice)}</td>
                          <td>{product.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>
                  {order.orderStage === 1 && (
                    <button className='vendor-btn bg-blue-600 p-4 text-white rounded-lg' onClick={() => {handleDispatch(order._id)
                    setOrders(orders.map((item) => {
                      if(item._id === order._id){
                        return {...item, orderStage: 2}
                      }
                      return item;
                    }
                    ))
                    }}>Dispatch</button>
                  )}
                  {order.orderStage === 2 && (
                    <button className='vendor-btn bg-green-600 p-4 text-white rounded-lg' onClick={()=>{
                      axios.put(`https://gmart-supermarket.vercel.app/updateStage/${order._id}`, { orderStage: 3});
                      setOrders(orders.map((item) => {
                        if(item._id === order._id){
                          return {...item, orderStage: 3}
                        }
                        return item;
                      }))
                    }}>Shipped</button>
                    )}
                  {order.orderStage === 3 && (
                    <button className='vendor-btn bg-green-600 p-4 text-white rounded-lg' onClick={()=>{
                      axios.put(`https://gmart-supermarket.vercel.app/updateStage/${order._id}`, { orderStage: 4});
                      setOrders(orders.map((item) => {
                        if(item._id === order._id){
                          return {...item, orderStage: 4}
                        }
                        return item;
                      }))
                    }}>Delivered</button>
                    )}
                  {order.orderStage === 4 && (
                    <img src='/delivered.jpg' alt='tick' className='vendor-tick w-10' />
                  )}
                </td>
                <td>
                  {order.orderStage === 1 && 'Order Received'}
                  {order.orderStage === 2 && 'Dispatched'}
                  {order.orderStage === 3 && 'Order Shipped'}
                  {order.orderStage === 4 && 'Order Delivered'}
                </td>
               {order.feedback!='' && <td>{order.feedback+ " \n"+ order.rating+ '⭐'}</td>}
               {order.feedback=='' && <td className=' text-red-600'>Feedback not given</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VendorOrders;
