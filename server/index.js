import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Order from "./cartOrderSchema.js";
import fileUpload from "express-fileupload";
import { createNewUser, signInUser } from "./user.js";
import path from "path";
import Product from "./productSchema.js";
import Feedback from "./feedbackSchema.js";

const dirname = "../client/public/";

const app = express();
dotenv.config({
  path: ".env",
});
app.use(fileUpload());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
    ],
  })
);

app.use(bodyParser.json());
const PORT = 3000;

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("Error in connecting to MongoDB:", error);
}

app.get("/", (req, res) => {
  res.send("Hello to Ratna Supermarket API");
});

app.post("/orderItems", async (req, res) => {
  console.log(req.body);
  const newOrder = new Order({
    id: req.body.id,
    order: req.body.order,
    date: new Date(),
    orderStage: 1,
    imageLink: req.body.imageLink,
    address: req.body.address,
    pinCode: req.body.pinCode,
    deliveryType: req.body.deliveryType,
  });

  await newOrder.save();

  try {
    // Add your code here to handle the order request

    res.send("Order received successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/allVendor", async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/allOrder/:id", async (req, res) => {
  console.log("allOrder");
  try {
    const orders = await Order.find({ id: req.params.id });
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/updateStage/:id", async (req, res) => {
  console.log(req.body);
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).send("Order not found");
    }
    order.orderStage = req.body.orderStage;
    await order.save();
    res.status(200).send("Order stage updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      res.status(404).send("Order not found");
    }
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/uploadImage", (req, res) => {
  // Check if file is not available return message with status 400.
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  // Unique name is required for every uploaded file so we are renaming it with date string we can also use unique ID generators like UUID etc.
  const UFileName = `${new Date().getTime()}-${file.name.replaceAll(" ", "-")}`;
  // This line of code will save our file in public/uploads folder in our
  //appliction and will retrun err if any error found if no error found then return pathname of file.
  file.mv(`${dirname} ${UFileName}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: UFileName, filePath: `/${UFileName}` });
  });
});

app.post("/signUp", createNewUser);
app.post("/signIn", signInUser);

app.get("/allProducts", async (req, res) => {
  try {
    const order = await Product.find({});
    res.send(order);
    if (!order) {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addProduct", async (req, res) => {
  try {
    // Add your code here to handle the order request
    console.log(req.body);

    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      id: Math.floor(10000 + Math.random() * 90000) + req.body.id,
      productName: req.body.productName,
      mrp: req.body.mrp,
      bogo: req.body.bogo,
      discountPrice: req.body.discountPrice,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
    });

    await newProduct.save();
    console.log("Product added successfully");
    res.send("Product added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const order = await Product.findOne({ id: req.params.id });
    if (!order) {
      res.status(404).send("Product not found");
    }
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/updateFeedback/:id", async (req, res) => {
  console.log(req.body);
  try {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).send("Order not found");
    }
    order.feedback = req.body.feedback;
    order.rating = req.body.rating;
    await order.save();
    res.status(200).send("Order stage updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/submit-feedback", async (req, res) => {
  console.log(req.body);
  try {
    const feedback = await Feedback.create({
      name: req.body.name,
      email: req.body.email,
      rating: req.body.rating,
      feedback: req.body.feedback,
    });

    res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
});

app.get("/all-feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
