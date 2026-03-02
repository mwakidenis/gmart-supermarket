import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import BuyCard from "./BuyCard";
import axios from "axios";
// Import products data from JSON file

function CategoryList() {
  const params = useParams();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Fetch data from JSON file
    const fetchData = async () => {
      try {
        const response = await axios.get("https://gmart.vercel.app/allProducts");
        console.log(response.data);
        setProductsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, []);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    // Handle checkbox change here
    console.log(event.target.checked);
  };

  // Filter card data based on category
  const filteredCardData = productsData.filter((card) => card.category === params.categoryName);

  return (
    <div className="mt-[120px] flex">
      
      <div className="m-auto mt-16 md:mt-6 w-4/5 pl-5 overflow-y-visible ">
      <h2 className=" font-bold capitalize text-2xl ">{params.categoryName}</h2>
        <div className="p-5 grid md:grid-cols-4 justify-center md:justify-normal gird-cols-1 gap-4">
          {filteredCardData.map((card, index) => (
            <BuyCard
              key={index}
              id={card.id}
              productName={card.productName}
              mrp={card.mrp}
              discountPrice={card.discountPrice}
              bogo={card.bogo}
              imageUrl={card.imageUrl}
              averageRating={card.averageRating}
              totalRatings={card.totalRatings}
            />
          ))}
          {filteredCardData.length === 0 && <h2>No products found</h2>}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
