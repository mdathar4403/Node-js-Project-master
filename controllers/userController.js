
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
// create user register user
exports.registerController = async(req, res)=>{
    try{
        const {username, email , password} = req.body;
        if(!username || !email || !password){
            return res.status(400).send({
                message:'Please fill all the fields',
                success:false
            })
        }
        // existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.send(401).send({
                message:'User already exists',
                success:false
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        // save new user
        const user = new userModel({username, email, password: hashedPassword});
        await user.save();
        return res.status(201).send({
            message:'User created successfully',
            success:true,
            user
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message:'Error in Register callback',
            success:false,
            err
        })
    }
}
// get all users
exports.getAllUsers= async(req, res)=>{
    try{
        const users = await userModel.find({});
        return res.status(200).send({
            userCount : users.length,
            message:"All Users Data",
            success:true,
            users
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message:"Error in getAllUsers callback",
            success:false,
            err
        })
    }
}

// login
exports.loginController = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).send({
                message:"Please fill all the fields",
                success:false
            })
        }
        // existing user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                message: "User not found",
                success:false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send({
                message:"Invalid Credentials",
                success:false
            })
        }
        return res.status(200).send({
            message:"User Logged in successfully",
            success:true,
            user
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message:"Error in login callback",
            success:false,
            err
        })
    }
}
