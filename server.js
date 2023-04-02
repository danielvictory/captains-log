// Require Node packages
const express = require("express");
const mongoose = require("mongoose");
const mO = require("method-override");
require("dotenv").config();


// Set up app
const app = express();
const PORT = process.env.PORT || 4000;

// Set up MongoDB connection through mongoose
const DATABASE_URL = process.env.DATABASE_URL
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

// New

// Delete

// Update

// Create

// Edit

// Show

// Listen
app.listen(() => {
    console.log(`Open for business on PORT ${PORT}`)
})