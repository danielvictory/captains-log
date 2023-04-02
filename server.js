// Require Node packages
const express = require("express");
const mongoose = require("mongoose");
const mO = require("method-override");
require("dotenv").config();

// Set up app
const app = express();
const PORT = process.env.PORT || 4000;
console.log(`Port ${PORT} fed from .env`)

const DATABASE_URL = process.env.DATABASE_URL

// Set up varable with schema from model imports
const Product = require("./models/products.js")

// Set up MongoDB connection through mongoose

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

    // Connection Error/ Success callbacks
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(mO("_method"))

// Index
app.get("/", async(req, res) => {
    //res.send("hello")
    let allProducts = await Product.find({})
    res.render('index.ejs', {products: allProducts})
})

// New

// Delete

// Update

// Create

// Edit

// Show

// Listen
app.listen(PORT, () => console.log(`Open for business on PORT ${PORT}`))