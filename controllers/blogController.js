const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');


exports.getAllBlogsController = async(req, res) =>{
    try{
        const blogs = await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(404).send({
                message:"No Blogs Found",
                success:false,
            })
        }
        return res.status(200).send({
            blogCount: blogs.length,
            message:"All Blogs Lists",
            success:true,
            blogs
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message:"Error in getAllBlogs callback",
            success:false,
        })
    }
}
exports.createBlogController = async(req, res) =>{
    try{
        const {title, description, image, user} = req.body;

        if(!title||!description||!image|| !user){
            return res.status(400).send({
                message:"Please fill all the fields",
                success:false
            })
        }
        const existingUser = await userModel.findById(user);
        // validation 
        if(!existingUser){
            return res.status(404).send({
                message:"User not found",
                success:false
            })
        }
        
        const newBlog = new blogModel({title, description, image, user});
        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.blogs.push(newBlog);
        await newBlog.save({session});
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();


        return res.status(201).send({
            message:"Blog created successfully",
            success:true,
            newBlog
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            message:"Error in createBlog callback",
            success:false,
            err
        })
    }
}
exports.updateBlogController = async(req, res) =>{
    try{
        const {id} = req.params;
        const {title, description,image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true}) // new to indicate update is being made
        return res.status(200).send({
            message:"Blog updated successfully",
            success:true,
            blog
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message:"Error in updateBlog callback",
            success:false,
            err
        })
    
    }
}
exports.getSingleBlogController = async(req, res) =>{
    try{
        const {id}= req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                message:"No Blog Found",
                success:false,
            })
        }
        return res.status(200).send({
            message:"fetch single blog",
            success:true,
            blog
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message:"Error in getSingleBlog callback",
            success:false,
            err
        })
    }
}
exports.deleteBlogController = async(req, res) =>{
    try{
        // const blog = await blogModel.findByIdAndDelete(id);
        const blog = await blogModel
                    .findByIdAndDelete(req.params.id)
                    .populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).send({
            message:"Blog deleted successfully",
            success:true,
            // no need to show if deleted!!
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message:"Error in deleteBlog callback",
            success:false,
            err
        })
    }
}

exports.userBlogController = async(req, res) =>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if(!userBlog){
            return res.status(404).send({
                message:"No Blog Found",
                success:false,
            })
        }
        return res.status(200).send({
            message:"fetch user blog",
            success:true,
            userBlog
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).send({
            message:"Error in userBlog callback",
            success:false,
            err
        })
    }
}