import React, { useEffect, useState} from 'react'
import axios from 'axios'

import BuyCard from './../components/BuyCard';

function VendorProducts() {
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    // Fetch data from JSON file
    const fetchData = async () => {
      try {
        const response = await axios.get("https://gmart-supermarket.vercel.app/allProducts");
        console.log(response.data);
        setProductsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Vendor Products</h1>

      <div className="p-5 grid grid-cols-4 gap-4">
        {productsData.map((card, index) => (
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
            vendorSide={true}
          />
        ))}
      </div>
        {productsData.length === 0 && <h2>No products found</h2>}


    </div>
  )
}

export default VendorProducts