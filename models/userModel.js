const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add the username"]
    },
    email:{
        type: String,
        required: [true, "Please add user email"],
        unique: [true, "Email already taken"]
    },
    password:{
        type: String,
        required: [true, "Plese add user password"]
    }
},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema)