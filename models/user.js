const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, default: "anon user"},
    shopping_cart: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;