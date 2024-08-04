const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/BlogControllers');


// Get all blogs
router.get('/api/blogs', blogController.getAllBlogs);
// get a single blog
router.get('/api/blogs/:id', blogController.getSingleBlog);
// Create a new blog
router.post('/api/blogs', blogController.createBlogWithUpload);
// Delete a blog
router.delete('/api/blogs/:id', blogController.deletePost);
// Update a blog
router.put('/api/blogs/:id', blogController.updatePost);


module.exports = router;