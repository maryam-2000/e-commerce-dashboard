const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
    },
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        required:true,
    },
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;