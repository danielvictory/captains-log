// Require Node packages
const express = require("express");
const mongoose = require("mongoose");
const mO = require("method-override");
require("dotenv").config();

// Set up app
const app = express();
const PORT = process.env.PORT || 4000;

// Set up varable with schema from model imports
const Log = require("./models/log.js");
const logController = require("./controllers/logs.js");
const foodController = require("./controllers/foodlogs.js");

// Set up MongoDB connection through mongoose
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

    // Connection Error/ Success callbacks
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Set up Public for CSS calls
app.use(express.static('./public'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(mO("_method"))

// Index - home and index
    // Home
app.get("/", logController.home)

    // Index
app.get("/foodlogs", foodController.foodLog)

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

// Delete
app.delete("/:id", async(req, res) => {
    let i = req.params.id
    let deleteLog = await Log.findByIdAndDelete(i)
    res.redirect("/logs")
})

// Update
app.put("/logs/:id", async(req, res) => {
    let i = req.params.id

    req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false;
    let b = req.body

    let updateLog = await Log.findByIdAndUpdate(i, b, {new: true,},)

    res.redirect("/logs/"+i)
})

// Create
app.post("/", (req, res) => {
    req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false;
    const newLog = new Log(req.body);

    newLog.save().then(res.redirect('/'+newLog.id));
})

// Edit
app.get("/logs/:id/edit", async(req, res) => {
    let i = req.params.id

    let editLog = await Log.findById(i)

    res.render("edit.ejs", {
        log: editLog,
    })
})

app.get('/logs/:id', async(req, res) => {
    let i = req.params.id
    
    let foundLog = await Log.findById(i)
    
    res.render("show.ejs", {
        log: foundLog,
        })
});

// Listen
app.listen(PORT, () => console.log(`Live Long and Prosper on PORT ${PORT}`))