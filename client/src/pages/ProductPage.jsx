import React from "react";
import Carousel from "../components/Carousel";
import CategoriesHead from "../components/TopCategoriesHead";
import TopCategoriesList from "../components/TopCategoriesList";
import BuyCard from "../components/BuyCards";
import { useParams } from "react-router-dom";
import productsData from "../data/product.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from '../actions/CartControl';
import { formatKshFromInr } from "../utils/currency";

function ProductPage() {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const { addToCart, removeFromCart, cartItems } = useCart();
  // console.log(id);
  // // const data=JSON.parse()
  // console.log(productsData);
  // const getimgURL = (id) => {
  //   productsData;
  // };
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getimgURL() {
      try
      {
        const response= await axios.get(`https://gmart.vercel.app/product/${id}`);
        console.log(response.data);
        setProducts(response.data);
      }
      catch (error) {
        console.error(error);
      }
  
    }

    getimgURL();

    const cartItem = cartItems.find(item => item.id === id);
    if (cartItem) {
      setCount(cartItem.count);
    }
    
      
  }, [cartItems, id]);
  
  return (
    <>
      <div className="mt-[120px] flex">
        <div className="container flex justify-around md:px-1 px-10">
          <div className="lg:flex-row mt-[10vh] flex flex-col gap-[7.5vw]  md:mx-32 items-center">
            <img
              src={products.imageUrl}
              className="w-[50vw] max-w-lg rounded-2xl shadow-2xl"
            ></img>
            <div className="flex flex-col gap-4">
              <span className="font-black md:text-[2vw] text-3xl">{products.productName}</span>
         
              <div className="flex flex-col gap-1">
                <span className="text-[2.5vh]">Our Price:</span>
                <span className="text-[2.5vh]">
                  {formatKshFromInr(products.discountPrice)} <span className="text-[2vh] font-[100] line-through">{formatKshFromInr(products.mrp)}</span>
                </span>
              </div>
              {(count === 0 && (
              <div className=' mr-2' onClick={() => {
                setCount(count + 1);
                addToCart({ id, productName: products.productName, discountPrice: products.discountPrice, count: count + 1, imageUrl: products.imageUrl});
              }}>
                <button style={{
                  backgroundColor: '#F3F9FB',
                  borderColor: '#54B22C',
                  color: '#249B3E',
                  width: '60px',
                  borderRadius: '5px',
                  border: '1px solid',
                }}>ADD</button>
              </div>
            ))}
              {count > 0 && (
          <div className='mr-2 flex gap-2'>
            <span
              style={{
                cursor: 'pointer',
                marginTop: '1px',
                userSelect: 'none'
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
            <div><input type="text" className='w-6 border-2 indent-1' value={count} /></div>
            <span
              style={{
                cursor: 'pointer',
                marginTop: '1px',
                userSelect: 'none'
              }}
              onClick={() => {
                if (count >= 1 && count < 10)
                  setCount(count + 1);
                addToCart({ id, productName: products.productName, discountPrice: products.discountPrice, imageUrl: products.imageUrl, count: count + 1});
              }}
            >
              +
            </span>
          </div>
        )}
              {/* <span>
                <button className="px-[1.6vw] py-[1.4vh] text-[2.5vh] font-bold text-white flex flex-row gap-3 justify-center align-middle bg-green-500 shadow-lg shadow-green-300 rounded-lg">
                  <img className="w-[1.8vw]" src="/CartWhite.svg"></img>Add to
                  Cart
                </button>
              </span> */}
              <span className="font-bold">Description</span>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eveniet doloremque magni voluptatum, hic sed excepturi animi aut in debitis.
              </span>
              <span className="font-bold">
                Origin: <span className="font-normal">Kenya</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="md:mt-24 sm:mt-36 ">
          <span className="font-black text-[2vw] mx-[7vw]">
            Explore More Products:{" "}
          </span>
        </div>
        <CategoriesHead title="Shop From" greenTitle="Top Categories" />
        <TopCategoriesList />
       
      </div>
    </>
  );
}

export default ProductPage;
