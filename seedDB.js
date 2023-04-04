// Require Node packages
const mongoose = require("mongoose");
require("dotenv").config();

// Set up varable with schema from model imports
const x = require("./models/products.js")
const seed = require("./models/seed.js");

// Set up MongoDB connection through mongoose
const DATABASE_URL = process.env.DATABASE_URL
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
seedDB().then( () => {
    mongoose.connection.close()
});