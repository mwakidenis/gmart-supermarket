import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const BackgroundContainer = styled("div")({
  backgroundImage: `url('https://assets.bonappetit.com/photos/6491b45d047251c7e5ee269b/16:9/w_2560%2Cc_limit/GettyImages-107806725.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: -1, // Ensure it's behind other content
  backdropFilter: "blur(5px)",
  padding: "10px 10px 20px 10px"
});

function Vendor() {
  const [productData, setProductData] = useState({
    productName: "",
    mrp: "",
    bogo: false, // Set initially as false
    imageUrl: "",
    discountPrice: "",
    category: "",
    id: 0,
  });
  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(productData); 
  }, [productData]);

  const handleSubmit = async () => {
    try {
      
      
      
      if(productData.productName === "" || productData.mrp === "" || productData.imageUrl === "" || productData.discountPrice === "" || productData.category === "", productData.id === 0) {
        toast("Please fill all the fields",{
          Icon: '🚨',
        });
        return;
      }
      else {
        await axios.post("https://gmart.vercel.app/addProduct", productData);
      setProductData({
        productName: "",
        mrp: "",
        bogo: false, 
        imageUrl: "",
        discountPrice: "",
        category: "",
        id: 0,
      });
    }
      
     
    } catch (error) {
      console.error("Error submitting product data:", error);
     
    }
  };

  return (
    <BackgroundContainer>
      <div className="flex gap-5">
        <button
          className="bg-cyan-300 rounded-lg p-5"
          onClick={() => {
            navigator("/vendor/orders");
          }}
        >
          Orders Received
        </button>
        <button
          className="bg-cyan-300 rounded-lg p-5"
          onClick={() => {
            navigator("/vendor/products");
          }}
        >
          Products
        </button>
      </div>
      <div className="mt-[10px]">
        <Container>
          <h2 className="text-5xl m-10 text-bold">Vendor Side</h2>
          <br />
          <form
            className="flex flex-col gap-2 w-100"
            noValidate
            autoComplete="off"
          >
            <TextField
              name="productName"
              label="Product Name"
              variant="outlined"
              value={productData.productName}
              onChange={handleChange}
              className="bg-white"
            />
            <TextField
              name="mrp"
              label="Price"
              variant="outlined"
              value={productData.mrp}
              onChange={handleChange}
              className="bg-white"
              type="number"
            />
            <TextField
              name="imageUrl"
              label="Image URL"
              variant="outlined"
              value={productData.imageUrl}
              onChange={handleChange}
              className="bg-white"
            />
            <TextField
              name="discountPrice"
              label="Discount"
              variant="outlined"
              value={productData.discountPrice}
              onChange={handleChange}
              className="bg-white"
            />
            <TextField
              name="id"
              label="ID "
              variant="outlined"
              value={productData.id}
              onChange={handleChange}
              className="bg-white"
            />
            
            <Select
              name="category"
              value={productData.category}
              onChange={handleChange}
              variant="outlined"
              displayEmpty
              className="bg-white"
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              <MenuItem value="fruits & vegetables">
                Fruits & Vegetables
              </MenuItem>
              <MenuItem value="bath & body">Bath & Body</MenuItem>
              <MenuItem value="snacks & munchies">Snacks & Munchies</MenuItem>
              <MenuItem value="cold drinks & juices">
                Cold Drinks & Juices
              </MenuItem>
              <MenuItem value="egg, meat & fish">Egg, Meat & Fish</MenuItem>
              <MenuItem value="dairy & breakfast">
                Dairy & Breakfast
              </MenuItem>
              <MenuItem value="icy delights">Icy Delights</MenuItem>
            </Select>
            <Select
              name="bogo"
              value={productData.bogo ? "true" : "false"} // Convert boolean to string
              onChange={handleChange}
              variant="outlined"
              displayEmpty
              className="bg-white"
            >
              <MenuItem value="" disabled>
                Select BOGO
              </MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </Container>
      </div>
    </BackgroundContainer>
  );
}

export default Vendor;
