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
app.get("/new", (req, res) => {
    res.send('New Page')

    //res.render('new.ejs')
})

// Delete
app.delete("/:id", (req, res) => {
    console.log('deleted')
    // products.splice(req.params.id, 1)
    // shift += 1
    // console.log(shift)
    res.redirect("/")
})

// Update
app.put("/:id", (req, res) => {
    console.log('update')
    //products[req.params.id] = req.body
    res.redirect("/")
})

// Create
app.post("/", (req, res) => {
    console.log('created')
    res.send("create")
    res.redirect("/")
    // const p = new Book(req.body)
    // p.save().then(res.redirect('/'))
})

// Edit
app.get("/:id/edit", (req, res) => {
    console.log(`edit: ${req.params.id}`)
    res.send('Edit page')
    // res.render("edit.ejs", {
    //     product: products[req.params.id],
    //     index: req.params.id
    // })
})

// Show
app.get('/:id', (req, res) => {
    res.send('show page')

    // async
    // let i = req.params.id
    // let foundBook = await Book.findById(i).exec()
    // res.render("show.ejs", {book: foundBook})
});

// Listen
app.listen(PORT, () => console.log(`Open for business on PORT ${PORT}`))