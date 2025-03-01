import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import upload from "./middlewares/multer.middlewares.js";
import { Product } from "./module/product.module.js";
import { log } from "console";

const app = express();
dotenv.config();

app.use(express.json()); // ✅ Fix here
app.use(cors());

const Port = process.env.PORT || 8001;

// Database Connection with MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// API creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

//Creating Upload Endpoint for images
app.use('/images',express.static("upload/images"));
app.post("/upload",upload.single('product'),(req,res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${Port}/images/${req.file.filename}`
  })
})

//fetch all data in the mongo DB

app.get("/all_product", async(req, res) => {
  const data = await Product.find({});
  res.json(data);
})

app.post('/addproduct', async (req,res) => {
  let products = await Product.find({});
  let id;
  if(products.length > 0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = Number(last_product.id)+1;
  }
  else{
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  try {
    await product.save();
    console.log('Product saved successfully!');
  } catch (error) {
      console.error('Error saving product:', error.message);
  }
  res.json({
    success: true,
    id: id,
    name: req.body.name,
  })
})

// Deleting product in the database

app.post('/removeproduct', async(req,res) => {
  await Product.findOneAndDelete({id: req.body.id});
  console.log("Product deleted Successfully");
  res.json({
    success : true,
    name: req.body.name
  })
})

// Start the server
app.listen(Port, () => {
  console.log(`Server Running on Port ${Port}`);
});
