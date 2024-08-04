const Post = require('../Models/BlogModel');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Post.find().sort({ createdAt: -1});
    res.json(blogs);
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//a single blog

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Post.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error retrieving blog post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

// Create a new blog
const createBlog = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { title, content, blogsnippet } = req.body;
    const photo = req.file.filename;

    const newBlog = await Post.create({ title, content, blogsnippet, photo });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating new blog:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const createBlogWithUpload = [
  upload.single('photo'),
  createBlog
];

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findOneAndDelete({ _id: id });
    if (!result) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Updating post with ID:', id);
    console.log('Request method:', req.method);
    console.log('Request:', req.body);

    // Retrieve the form data from the request
    const { title, content, blogsnippet } = req.body;
    let photo = req.files ? req.files.photo : null;

    // Check if all required fields are present
    if (!title || !content || !blogsnippet) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, blogsnippet, photo },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = { getAllBlogs, createBlogWithUpload, deletePost, updatePost, getSingleBlog };