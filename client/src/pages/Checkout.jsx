import React, { useState } from "react";
import Payment from "../components/Payment";
import { useNavigate } from "react-router-dom";
import { useCart } from "../actions/CartControl";
import axios from "axios";
import { formatKshFromInr } from "../utils/currency";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.count,
    0
  );
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [address, setAddress] = useState(""); // State to store the address

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user.uid;

  const handlePayment = async () => {
    if (!address) {
      toast("Please enter the address", {
        icon: '👣',
      });
      return;
    }
    else
    {
      try {
      const pincode=localStorage.getItem("userPincode");
      const deliveryType=localStorage.getItem("orderType");
      console.log("Pincode: ",pincode);
      console.log("Delivery Type: ",deliveryType);
      await axios.post(
        "https://gmart-supermarket.vercel.app/orderItems",
        {
          id: userID,
          order: cartItems,
          orderStage: 1,
          address: address, 
          pinCode: pincode,
          deliveryType: deliveryType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      console.log("Order Placed");
      setCartItems([]);
      setPaymentSuccess(true);
    
      setTimeout(() => {
        navigate("/orders");
      }, 3000);

      
    } catch (err) {
      console.log(err);
    }}
  };

  return (
    <>
      <div className="mt-[150px] flex mx-auto w-full justify-center items-start h-[]">
        <div className="w-[300px] p-4 border rounded-md shadow-md flex flex-col gap-4">
          {!paymentSuccess && (
            <>
              <h1>Total Amount: {formatKshFromInr(totalAmount)}</h1>
              {/* Input field for the address */}
              
              <Payment />

              <h1>Enter your address below</h1>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "100%",
                padding: "12px 20px",
                margin: "8px 0",
                display: "inline-block",
                border: "1px solid #ccc", 
                borderRadius: "4px",
                boxSizing: "border-box",
                }}
              />
              <br />
              <br />
              <button
                className="bg-red-500 text-white rounded-lg"
                onClick={handlePayment}
              >
                Payment Done for Demo
              </button>
            </>
          )}

          {paymentSuccess && (
            <>
              <img src="Animation - 1713010980986.gif" alt="" className="w-25" />
              Your Payment is Successful
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Checkout;
