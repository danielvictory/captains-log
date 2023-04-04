const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    title: {type: String, default: "New Log Entry"},
    entry: String,
    shipIsBroken: {type: Boolean, default: true},
    },
    {timestamps: true}
);

const Log = mongoose.model('Log', logSchema);

module.exports = Log;