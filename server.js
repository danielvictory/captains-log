// Require Node packages
const express = require("express");
const mongoose = require("mongoose");
const mO = require("method-override");
require("dotenv").config();

// Set up app
const app = express();
const PORT = process.env.PORT || 4000;

// Set up varable with schema from model imports
const Log = require("./models/log.js")
//const User = require("./models/user.js")

// Set up MongoDB connection through mongoose
const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

    // Connection Error/ Success callbacks
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Set up Public for CSS calls
app.use(express.static('public'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(mO("_method"))

// Index - home and index
app.get("/", (req, res) => {
    res.send(`<h1>CAPTAIN'S LOG</h1>
    <h2>TOP SECRET</h2>
    <p>Seriously, please be cool about this...</p>
    <a href="/logs">Open Log</a>`)
})

    // index
app.get("/logs", async(req, res) => {
    //async
    //let allProducts = await Product.find({})
    let allLogs = await Log.find({})
    res.render('index.ejs', {
        logs: allLogs,
        //comments: allComments,
    })
})

// New
app.get("/new", (req, res) => {
    res.render('new.ejs')
})

// // Delete
// app.delete("/:id", async(req, res) => {
//     let i = req.params.id
//     let deleteProduct = await Product.findByIdAndDelete(i)
//     res.redirect("/")
// })

// // Update
// app.put("/:id", async(req, res) => {
//     let i = req.params.id
//     let b = req.body

//     let updateProduct = await Product.findByIdAndUpdate(i, b, {new: true,},)

//     res.redirect("/"+i)
// })

// //Update - Buy Button
// app.put("/:id/buy", async(req, res) => {
//     let i = req.params.id
//     let p = await Product.findById(i)
    
//     // let u = {username: '', shopping_cart: []}
//     // u.shopping_cart.push(p)
//     // console.log(u)
//     // const newUser = new User()
//     newUser.shopping_cart.push(p)
//     //console.log(newUser)
//     newUser.save()

//     p.qty -= 1
//     await Product.findByIdAndUpdate(i, p, {new: true})

//     res.redirect("/"+i)
// })

// Create
app.post("/", (req, res) => {
    req.body.isShipBroken = req.body.isShipBroken === "on" ? true : false;
    const newLog = new Log(req.body);
    console.log(newLog)
    // newLog.isShipBroken = newLog.isShipBroken === "on" ? true : false;
    // console.log(newLog)
    newLog.save().then(res.redirect('/logs'));
})

// // Edit
// app.get("/:id/edit", async(req, res) => {
//     let i = req.params.id

//     let editProduct = await Product.findById(i)
    
//     res.render("edit.ejs", {
//         product: editProduct,
//     })
// })

// // Show
// app.get('/user', async(req, res) => {
//     // console.log(db.users.dataSize())
//     //let u = await User.findById(newUser._id)
//     //let foundProduct = await Product.findById(i)

//     res.render("user.ejs", {
//         products: newUser.shopping_cart,
//         })
// });

app.get('/:id', async(req, res) => {
    let i = req.params.id
    
    let foundLog = await Log.findById(i)

    res.render("show.ejs", {
        log: foundLog,
        id: i,
        })
});

// Listen
app.listen(PORT, () => console.log(`Live Long and Prosper on PORT ${PORT}`))