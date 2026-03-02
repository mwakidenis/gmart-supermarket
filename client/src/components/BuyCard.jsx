import React, { useState, useEffect } from 'react';
import { useCart } from '../actions/CartControl';
import { useNavigate } from 'react-router-dom';
import { formatKshFromInr } from '../utils/currency';

function BuyCard({ bogo, mrp, discountPrice, imageUrl, productName, discount, id, averageRating = 0, totalRatings = 0, cart, setCart, setTotal, total, vendorSide }) {
  const [count, setCount] = useState(0);
  const { addToCart, removeFromCart, cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const cartItem = cartItems.find(item => item.id === id);
    if (cartItem) {
      setCount(cartItem.count);
    }
  }, [cartItems, id]);

  return (
    <div className='card w-56  flex justify-center align-middle flex-col border-2 rounded-[15px] relative hover:scale-105 transition transform ease-in-out duration-300'>
      <div className='bg-slate-200 w-full flex justify-center rounded-t-[12px] align-top cursor-pointer' onClick={() => {
        navigate(`/product/${id}`)
      }}>
        <img src={imageUrl} alt="" />
      </div>
      <div className='p-2 flex-1'>
        <span className="flex-grow cursor-pointer hover:underline" onClick={() => {
        navigate(`/product/${id}`)
      }}>{productName}</span>
        <div className="text-sm text-yellow-500 mt-1">
          {"★".repeat(Math.round(averageRating || 0))}
          <span className="text-gray-400">{"☆".repeat(5 - Math.round(averageRating || 0))}</span>
          <span className="text-gray-600 ml-2 text-xs">({totalRatings || 0})</span>
        </div>
        <span style={{
          color: '#54B22C'
        }}>{bogo && '(Buy 1 Get 1 FREE)'}</span>
      </div>
      <div className='flex p-2 justify-between mt-5 w-full'>
        <div>
          {formatKshFromInr(discountPrice || 0)}
          {'   '}
          <span className='line-through text-xs'>
            {formatKshFromInr(mrp || 0)}
          </span>
        </div>
        {!vendorSide && (count === 0 && (
          <div className='mr-2' onClick={() => {
            setCount(count + 1);
            addToCart({ id, productName, discountPrice, count: count + 1, imageUrl });
          }}>
            <button style={{
              backgroundColor: '#F3F9FB',
              borderColor: '#54B22C',
              color: '#249B3E',
              width: '60px',
              borderRadius: '75px',
              border: '1px solid',
            }}>ADD</button>
          </div>
        ))}
        {count > 0 && (
          <div className='mr-2 flex gap-2 border rounded-full border-green-500'>
            <span
              style={{
                cursor: 'pointer',
                marginTop: '1px',
                userSelect: 'none',
                paddingLeft:"8px",
                
              }}
              onClick={() => {
                if (count >= 1) {
                  setCount(count - 1);
                  removeFromCart({ id });
                }
              }}
            >
              -
            </span>
            <div><input type="text" className=' w-8 bg-green-500 text-white  text-center select-none h-full' value={count} /></div>
            <span
              style={{
                cursor: 'pointer',
                marginTop: '1px',
                userSelect: 'none',
                paddingRight:"8px",
              }}
              onClick={() => {
                if (count >= 1 && count < 10)
                  setCount(count + 1);
                addToCart({ id, productName, discountPrice, imageUrl, count: count + 1 });
              }}
            >
              +
            </span>
          </div>
        )}
      </div>
      <div className='absolute' style={{
        top: '0',
        left: '80%',
        backgroundColor: '#54B22C',
        color: 'white',
        padding: '5px',
        borderRadius: '0 13px 0 15px',
      }}>
        {discount || parseInt((mrp - discountPrice) / mrp * 100) || 0}% OFF
      </div>
    </div>
  );
}

export default BuyCard;
