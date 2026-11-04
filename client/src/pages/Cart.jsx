import React, { useEffect, useState } from 'react';
import { useCart } from '../actions/CartControl';
import Payment from '../components/Payment';
import { useNavigate } from 'react-router-dom';
import {FaMinus} from "react-icons/fa"
import {FaPlus} from "react-icons/fa"
import {FaTrash} from "react-icons/fa"
import { formatKshFromInr } from '../utils/currency';

function Cart() {
  const { cartItems, addToCart,decreaseCount ,removeFromCart, isLogin } = useCart();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculatedTotal = cartItems.reduce(
      (acc, item) => acc + item.discountPrice * item.count,
      0
    );
    setTotalPrice(calculatedTotal);
  }, [cartItems]);

  console.log(cartItems);
  return (
    <div className='mt-[120px] mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md py-12'>
      <h1 className='text-2xl md:text-3xl font-semibold mb-4'>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className='text-gray-600'>Your cart is empty.</p>
      ) : (
        <>
          <ul className='divide-y divide-gray-300'>
            {cartItems.map((item) => (
              <li key={item.id} className='py-2 flex flex-col md:flex-row items-center justify-between'>
                <img src={item.imageUrl} alt={item.productName} className='w-24 h-24 md:w-16 md:h-16 object-cover' />
                <div className='flex-1 mx-4 text-center md:text-left'>
                  <h2 className='text-lg font-medium'>{item.productName}</h2>
                  <p className='text-gray-600'>
                    {formatKshFromInr(item.discountPrice * item.count)}
                  </p>
                </div>
                <div className='flex items-center mt-2 md:mt-0'>
                  <button
                    className='p-2 text-gray-600'
                    onClick={() => decreaseCount({id:item.id})}
                  >
                    <FaMinus />
                  </button>
                  <p className='mx-2'>{item.count}</p>
                  <button
                    className='p-2 text-gray-600'
                    onClick={() => addToCart(item)}
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  className='text-red-600 mt-2 md:mt-0'
                  onClick={() => removeFromCart({ id: item.id })}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className='mt-4 text-center md:text-left'>
            <h2 className='text-xl font-semibold'>Total Price: {formatKshFromInr(totalPrice)}</h2>
          </div>
          <button
            className="w-full md:w-auto text-white bg-black p-3 rounded-lg mt-4"
            onClick={() => {
              if (isLogin) {
                navigate('/checkout');
              } else {
                navigate('/sign');
              }
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
);
}

export default Cart;
