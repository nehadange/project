const mongoose = require('mongoose');

const data = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

module.exports = mongoose.model("users",data);