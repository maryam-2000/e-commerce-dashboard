const Users = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

// ============================= User SignUp =======================================
const signup = async (req, res) => {
    try{
        // Check if the email already exists
        let check = await Users.findOne({email:req.body.email});
        if(check){
            return res.status(400).json({success:false,errors:"Existing user found with the same email address"});
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Generate a default cart object
        let cart = {};
        for(let i = 0; i < 300; i++){
        cart[i]=0;
        }

        // Find the latest user ID to increment
        let users = await Users.find({});
        let id;
        if(users.length > 0){
            let user_array = users.slice(-1);
            let last_user = user_array[0];
            id = last_user.id+1;
        }
        else{
            id=1;
        }

        // Create a new user with the hashed password
        const user = new Users({
            id:id,
            username:req.body.username,
            email:req.body.email,
            password: hashedPassword,
            isAdmin:false,
            cartData:cart,
        })
    
        // Save the user to the database
        await user.save();
    
        // Generate a JWT token for the user
        const data = {
            user: {
            id: user.id,
            },
        };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        const isAdmin = user.isAdmin || false;
        const Userid = user.id;
        const name = user.username;
                
        res.json({ success: true, token, isAdmin, Userid, name });
    } 
    catch (error) {
        // Handle errors
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, errors: 'Internal Server Error' });
    }
}

// ============================= User LogIn =========================================
const login = async (req, res) => {
    try{
        // Find the user by email
        let user = await Users.findOne({email:req.body.email});

        if(user){
            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                // If passwords match, generate a JWT token and send the success response
                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const token = jwt.sign(data, process.env.JWT_SECRET);
                const isAdmin = user.isAdmin || false;
                const id = user.id;
                const name = user.username;
                
                res.json({ success: true, token, isAdmin, id, name });
            } else {
                // If passwords don't match, send an error response
                res.json({ success: false, errors: 'Wrong Password' });
            } 
        }
        else {
        // If no user found, send an error response
            res.json({ success: false, errors: 'Wrong Email Address' });
        }
    }
    catch (error) {
        // Handle errors
        console.error('Error during login:', error);
        res.status(500).json({ success: false, errors: 'Internal Server Error' });
    }
}

module.exports = {
    signup,
    login
  };