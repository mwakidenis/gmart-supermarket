import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';
import { formatKshFromInr } from '../utils/currency';

const steps = [
  'Payment Successful',
  'Order Received',
  'Order Shipped',
  'Order Delivered',
];

 function Tracking() 
 {
  const [activeStep, setActiveStep] = useState(0);
  const [order, setOrder] = useState([{}]);
  const params = useParams();


  const orderID = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://gmart.vercel.app/order/${orderID}`, { headers: { 'Access-Control-Allow-Origin': '*' } });
          const order = response.data;
          console.log(order.orderStage);
          setActiveStep(order.orderStage);
          setOrder(order.order);

            let totalAmount = 0;
          order.order.forEach(item => {
            totalAmount += item.discountPrice * item.count;
          });
          setTotal(totalAmount);
      } catch (error) {
          console.error('Error fetching order:', error);
      }
    }
    fetchData();
  }, [])
  const [total, setTotal] = useState(0);
  return (
    <>
       <div className='container mx-auto mt-44 '>
            <h2 className='px-[11rem] text-2xl mb-14 font-bold'>Order Tracking for Order ID {orderID}</h2>
            <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            </Box>
            <div className='container mx-auto hidden md:flex justify-center w-40 gap-52 mb-32 '>
                <img src="/delivery_1.svg" alt="" className={`${activeStep < 1 ? 'filter grayscale opacity-50' : ''}`}/>
                <img src="/delivery_2.svg" alt="" className={`${activeStep < 2 ? 'filter grayscale opacity-50' : ''}`} />
                <img src="/delivery_3.svg" alt="" className={`${activeStep < 3 ? 'filter grayscale opacity-50' : ''}`}/>
                <img src="/delivery_4.svg" alt="" className={`${activeStep <4 ? 'filter grayscale opacity-50' : ''}`}/>
            </div>

            {order.map((item) => (
                <div key={item._id} className='flex justify-between items-center border-b-2 py-4'>
                    <div className='flex gap-4 '>
                        <img src={item.imageUrl} alt="" className='w-20 h-20 object-contain'/>
                        <div>
                            <h3 className='font-bold'>{item.name}</h3>
                          <p>Price: {formatKshFromInr(item.discountPrice)}</p>
                            <p>Quantity: {item.count}</p>
                        </div>
                    </div>
                      <p>Subtotal: {formatKshFromInr(item.discountPrice * item.count)}</p>
                </div>
            ))}

            <div className='flex justify-between items-center py-4'>
                <h3 className='font-bold text-5xl'>Total</h3>
              <p className='text-5xl'>{formatKshFromInr(total)}</p>
            </div>
            {/* <button className=' bg-red-600 px-3 text-white' onClick={()=>{
                setActiveStep((prevActiveStep) =>( prevActiveStep + 1))
            }}>Check</button> */}
        </div>
    </>
  );
}

export default Tracking;