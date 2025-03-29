import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import upload from "./middlewares/multer.middlewares.js";
import { Product } from "./module/product.module.js";
import { User } from "./module/user.modules.js";
import fetchuser from "./middlewares/fetchuser.middlewares.js";

const app = express();
dotenv.config();

app.use(express.json()); 
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
  try {
    res.status(402).json({
      success: true,
      image_url: `http://localhost:${Port}/images/${req.file.filename}`
    })
  } catch (error) {
    res.status(502).json({
      success :false,
      message : "Error in uploading image"
    })
  }
  
})

//fetch all data in the mongo DB

app.get("/all_product", async(req, res) => {
  const data = await Product.find({});
  res.status(400).json(data);
})

// Add product

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
    res.status(400).json({ 
      success: true, 
      message: "Product saved successfully!" 
    });

  } catch (error) {
      res.status(502).json({
        success: false, 
        message: "Error Adding products", 
        error
      })
      console.error('Error saving product:', error.message);
  }
})

app.delete('/deleteproduct', async(req,res) => {
  try {
    await Product.deleteMany({}); 
    res.json({ 
      success: true, 
      message: "All products deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error deleting products", 
      error });
  }})

// Deleting product in the database

app.post('/removeproduct', async(req,res) => {
  try {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Product deleted Successfully");
    res.status(401).json({
      success : true,
      name: req.body.name
    })
  } catch (error) {
    res.status(501).json({ 
      success: false, 
      message: "Error deleting products", 
      error 
    });
  }

})

// Creating Endpooint for registeriing the user

app.post('/signup', async (req,res) => {
  let check = await User.findOne({email : req.body.email});

  if(check) {
    return res.status(400).json({
      success : false,
      error : "Existing user found with same Email address"
    })
  }
  let cart = {};

    for(let i = 0; i < 300; i++) cart[i] = 0;

    const user = new User({
      name : req.body.username,
      email : req.body.email,
      password : req.body.password,
      cartData : cart,
    })

    await user.save();

    const data = {
      user : {
        id : user.id
      }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({
      success : true,
      token
    })
})

// Creating endpoint for user login

app.post('/login',async(req,res) => {
  let user = await User.findOne({email : req.body.email});

  if(user){
    if(req.body.password === user.password){
      const data = {
        user : {
          id : user.id
        }
      }
      const token = jwt.sign(data,'secret_ecom');
      res.json({
        success : true,
        token
      })
    }else {
      res.json({
        success : false,
        message : "Wrong Password"
      })
    }
  }
  else {
    res.json({
      success : false,
      message : "Wrong email id"
    })
  }
})

// creating endpoint for newcollection data

app.get('/newcollection', async(req,res) => {
  let product = await Product.find({});
  let newcollection = product.slice(1).slice(-8);
  res.json(newcollection)
})

// Creating endpoint for popular in women section

app.get('/popularinwomen', async(req,res) => {
  let product = await Product.find({category : "women"});

  let product_in_women = product.slice(0,4);

  res.json(product_in_women)
})

// creating endpoint for adding products in cartdata

app.post('/addtocart',fetchuser, async(req,res) => {
  let userData = await User.findOne({_id : req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate({_id : req.user.id}, {cartData : userData.cartData});
  console.log(`Added product id : ${req.body.itemId}`)
  res.send("Added");
})

// Creating endpoint to remove products from cartdata

app.post('/removefromcart',fetchuser,async(req,res) => {
  let userData = await User.findOne({_id : req.user.id});
  if(userData.cartData[req.body.itemId] > 0){
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({_id : req.user.id}, {cartData : userData.cartData});
    console.log(`Removed product id : ${req.body.itemId}`)
    res.send("Removed");
  }
})

// Creating endpoint to get cartdata 
app.post('/getcart',fetchuser, async(req,res) => {
  console.log("GetCart");
  let userData = await User.findOne({_id : req.user.id});
  res.json(userData.cartData);
})


// Start the server
app.listen(Port, () => {
  console.log(`Server Running on Port ${Port}`);
});
