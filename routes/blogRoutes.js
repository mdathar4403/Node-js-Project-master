const express = require('express');
const { getAllBlogsController, 
        createBlogController,
        updateBlogController, 
        getSingleBlogController, 
        deleteBlogController,
        userBlogController,
    } = require('../controllers/blogController');

// router object
const router = express.Router();

// routes
// GET ALL BLOGS || GET
router.get('/all-blog',getAllBlogsController);

// CREATE BLOG || POST
router.post('/create-blog',createBlogController);

// update blog || PUT
router.put('/update-blog/:id', updateBlogController);

// get single blog || GET
router.get('/get-blog/:id', getSingleBlogController);

// delete blog || DELETE
router.delete('/delete-blog/:id', deleteBlogController);

// GET || user blog
router.get('/user-blog/:id',userBlogController);

module.exports = router;

