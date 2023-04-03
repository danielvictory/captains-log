// Require Node packages
const express = require("express");
const mongoose = require("mongoose");
//const mO = require("method-override");
require("dotenv").config();

// Set up app
const app = express();
const PORT = process.env.PORT || 4000;

const DATABASE_URL = process.env.DATABASE_URL

// Set up varable with schema from model imports
const Product = require("./models/products.js")
const seed = require("./models/seed.js");
//const { openDelimiter } = require("ejs");

// Set up MongoDB connection through mongoose

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

    // Connection Error/ Success callbacks
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Seed
const seedDB = async () => {
    await Product.deleteMany({});
    await Product.insertMany(seed);
}
seedDB();