import React from "react";
import BuyCard from "./BuyCard";
import './BuyPage.css';

function BuyCards({ bogo }) {
  const dummyData = [
    { id: 100, productName: "B Natural Mixed Fruit Juice ", mrp: "200", discountPrice: "150", bogo: true, imageUrl: "juice.svg"},
    { id: 101, productName: "Hen Fruit White Protein Rich Eggs", mrp: "250", discountPrice: "200", imageUrl: "eggs.png"},
    { id: 102, productName: "Go Cheese Slices 200 g", mrp: "180", discountPrice: "140" , imageUrl: "Go_cheese.png"},
    { id: 105, productName: "Soan Papdi by Charlie's 200 g", mrp: "150", discountPrice: "120", imageUrl: "soan_papdi.png"},
    { id: 106, productName: "Cremica Chocolate Thicker Syrup", mrp: "300", discountPrice: "250" , imageUrl: "chocolate_syrup.png"},
  ];

  return (
    <>
      <div className="mt-5 px-10">
        <div className="container mx-auto mt-5 flex justify-center md:justify-start items-center ">
          <div className="grid-box">
            {dummyData.map((item, index) => (
              <BuyCard
                id={item.id}
                key={index}
                bogo={item.bogo}
                productName={item.productName}
                mrp={item.mrp}
                discountPrice={item.discountPrice}
                imageUrl={'/'+item.imageUrl}>
                
              </BuyCard>
            ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyCards;
