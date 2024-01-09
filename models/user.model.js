const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username:String,
    password:String
})

const userModel = mongoose.model("user",schema)

module.exports = {userModel}