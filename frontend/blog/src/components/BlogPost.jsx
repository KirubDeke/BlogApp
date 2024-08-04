import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogPostStyle.css';
import Subscribe from './Subscribe';
import  Footer from './Footer';

const BlogPost = () => {
  const { blogId } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [daysDiff, setDaysDiff] = useState(0);

  const fetchBlogPost = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:7700/api/blogs/${blogId}`);
      setBlogPost(response.data);

      // Calculate the number of days since the blog post was created
      const createdAtDate = new Date(response.data.createdAt);
      const currentDate = new Date();
      setDaysDiff(Math.floor((currentDate - createdAtDate) / (1000 * 60 * 60 * 24)));
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError('Error fetching blog post');
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    if (!blogId) {
      setError('Blog ID is not available');
      return;
    }

    fetchBlogPost();
  }, [blogId, fetchBlogPost]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogPost) {
    return <div>No blog post found.</div>;
  }

  return (
    <div>
      <div className='blog-post'>
        {blogPost.photo ? (
          <img src={`http://localhost:7700/images/${blogPost.photo}`} alt={blogPost.title} />
        ) : (
          <p>No image available</p>
        )}
        <h1>{blogPost.title}</h1>
        <p>{blogPost.content}</p>
        <p>Created {daysDiff} days ago</p>
      </div>
      <Subscribe />
      <Footer />
    </div>
  );
};

export default BlogPost;