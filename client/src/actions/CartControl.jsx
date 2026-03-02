import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
   
  ]);
  
  const [orderDirect,setOrderDirect] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name,setName] = useState('');
  const [userDetails,setUserDetails] = useState({});
  const [startflag,setStartFlag] = useState(0);
  const addToCart = (item) => {
   
    setCartItems((prevItems)=>{
      const exist = prevItems.find((x)=> x.id === item.id);

      if(exist){
        return  prevItems.map((x) => x.productName === item.productName  ? {...x, count: x.count + 1} : x);
      }else{
        return [...prevItems, item];
      }
    })
    console.log('addToCart:', item);
  };

  const removeFromCart = ({ id }) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? item.count > 1
            ? { ...item, count: item.count - 1 }
            : null
          : item
      ).filter(Boolean)
    );
  };


  const decreaseCount = (item) => {
    if (item.count > 1) {
      addToCart({ ...item, count: item.count - 1 });
    } else {
      removeFromCart(item);
    }
  };
  return (
    <CartContext.Provider value={{ cartItems,setCartItems, addToCart,removeFromCart,decreaseCount, isLogin, setIsLogin,name,setName,userDetails, setUserDetails,orderDirect,setOrderDirect, startflag,setStartFlag  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
