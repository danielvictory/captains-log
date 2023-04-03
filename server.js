// Require Node packages
const express = require("express");
const mongoose = require("mongoose");
const mO = require("method-override");
require("dotenv").config();

// Set up app
const app = express();
const PORT = process.env.PORT || 4000;

const DATABASE_URL = process.env.DATABASE_URL

// Set up varable with schema from model imports
const Product = require("./models/products.js")
const seed = require("./models/seed.js");
const { openDelimiter } = require("ejs");

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

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(mO("_method"))

// Index
app.get("/", async(req, res) => {
    //res.send("hello")
    let allProducts = await Product.find({})
    //console.log(allProducts)
    //console.log(allProducts[0])
    res.render('index.ejs', {products: allProducts})
})

// New
app.get("/new", (req, res) => {
    res.render('new.ejs')
})

// Delete
app.delete("/:id", async(req, res) => {
    let deleteProduct = await Product.find({})
    deleteProduct.splice(req.params.id, 1)
 
    await Product.deleteMany({});
    await Product.insertMany(deleteProduct);

    res.redirect("/")
})

// Update
app.put("/:id", async(req, res) => {
    //console.log('update')
    let i = req.params.id
    let updateProduct = await Product.find({})
    updateProduct[i] = req.body

    await Product.deleteMany({});
    await Product.insertMany(updateProduct);

    res.redirect("/")
})

    //Buy Button
app.put("/:id/buy", async(req, res) => {
    let i = req.params.id
    let x = await Product.find({})
    x[i].qty -= 1
    console.log(x[i].qty)

    await Product.deleteMany({});
    await Product.insertMany(x);

    res.redirect("/"+i)
})

// Create
app.post("/", (req, res) => {
    //console.log('creating')
    const newProduct = new Product(req.body)
    newProduct.save().then(res.redirect('/'))
})

// Edit
app.get("/:id/edit", async(req, res) => {
    // console.log(`edit: ${req.params.id}`)
    // res.send('Edit page')
    let i = req.params.id
    let editProduct = await Product.find({})
    res.render("edit.ejs", {
        product: editProduct[i],
        index: req.params.id
    })
})

// Show
app.get('/:id', async(req, res) => {
    let i = req.params.id
    let foundProducts = await Product.find({})
    res.render("show.ejs", {product: foundProducts[i],
    index: i})
});

// Listen
app.listen(PORT, () => console.log(`Open for business on PORT ${PORT}`))