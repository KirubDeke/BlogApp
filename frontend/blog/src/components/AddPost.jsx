import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddPostStyle.css';
import img9 from '../assets/img12.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddNewPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', blogsnippet: '', photo: null });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);

  useEffect(() => {
    // Fetch existing posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://blogapp-2-k07r.onrender.com/api/blogs');
        // Check if the response data is an array, if not, handle it accordingly
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error('Error: response data is not an array');
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      blogsnippet: post.blogsnippet,
      photo: null,
    });
  };

  const handleDelete = (post) => {
    setDeletingPost(post);
    // Add the delete logic here
    axios
      .delete(`https://blogapp-2-k07r.onrender.com/api/blogs/${post._id}`)
      .then((res) => {
        console.log(res);
        setDeletingPost(null);
        // Remove the deleted post from the posts state
        setPosts(posts.filter((p) => p._id !== post._id));
      })
      .catch((err) => {
        console.log(err);
        setDeletingPost(null);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    formData.append('blogsnippet', newPost.blogsnippet);
    if (newPost.photo) {
      formData.append('photo', newPost.photo);
    }
  
    try {
      let response;
      if (editingPost) {
        console.log('Updating post:', editingPost._id);
        response = await axios.put(`https://blogapp-2-k07r.onrender.com/api/blogs/${editingPost._id}`, formData);
        console.log('Update response:', response.data);
        // Update the posts state with the updated post
        setPosts(
          posts.map((p) => (p._id === editingPost._id ? { ...p, ...response.data } : p))
        );
        setEditingPost(null);
        setNewPost({ title: '', content: '', blogsnippet: '', photo: null });
      } else {
        // Create a new post
        response = await axios.post('https://blogapp-2-k07r.onrender.com/api/blogs/', formData);
        console.log('Create response:', response.data);
        // Add the new post to the posts state
        setPosts([...posts, response.data]);
        setNewPost({ title: '', content: '', blogsnippet: '', photo: null });
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      // Handle the error appropriately
    }
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  const handlePhoto = (e) => {
    setNewPost({ ...newPost, photo: e.target.files[0] });
  }
  const handleBack = () => {
    navigate(-1);
  };
 const handleLogout = () =>{
    navigate('/LoginPage');
 }
  return (
    <div className="container">
      <div className='top'>
        <div className="left-section">
          <img src={img9} style={{ height: '500px',width:'125%' }} alt="image" />
        </div>
        <div className="right-section">
          <h2>Add New Post</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="content"
              placeholder="Content"
              value={newPost.content}
              onChange={handleInputChange}
              required
            ></textarea>
            <input
              type="text"
              name="blogsnippet"
              placeholder="Blog Snippet"
              value={newPost.blogsnippet}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={handlePhoto}
            />
           <div className="button-group">
              <button type="submit">Publish</button>
              <button type="button" onClick={handleBack}>Back</button>
              <button type="button" onClick={handleLogout}>Logout</button>
            </div>
          </form>
        </div>
      </div>
     
      <div className="bottom-section">
        <h2>Previous Posts</h2>
        <div className="post-box">
           {posts.length > 0 ? (
           posts.map((post, index) => (
        <div key={index} className="post-item">
           {post.photo ? (
             <img src={`https://blogapp-2-k07r.onrender.com/images/${post.photo}`} alt={post.title} />
           ) : (
             <p>No image available</p>
        )}
        <h3>{post.title}</h3>
        <p>{post.blogsnippet}</p>
        <p>{post.content}</p>
        <div className="post-actions">
        <button
           className="edit-icon"
           onClick={() => handleEdit(post)}
          disabled={editingPost && editingPost._id !== post._id}
       >
           <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
           className="delete-icon"
           onClick={() => handleDelete(post)}
           disabled={deletingPost && deletingPost._id === post._id}
         >
          <FontAwesomeIcon icon={faTrash} />
        </button>
</div>
       </div>
      ))
      ) : (
         <p>No posts found.</p>
        )}
    </div>
      </div>
    </div>
  );
};

export default AddNewPost;
