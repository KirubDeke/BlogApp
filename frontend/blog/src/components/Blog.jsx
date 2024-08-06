import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Blog.css';
import readingimg from '../assets/reading.png';
import Subscribe from './Subscribe';
import Footer from './Footer';
import Pagination from 'react-bootstrap/Pagination';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const Blog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogsPerPage] = useState(6); // Set the number of blogs to display per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://blogapp-2-k07r.onrender.com/api/blogs');
        if (Array.isArray(response.data)) {
          const sortedBlogs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setBlogs(sortedBlogs);
          setTotalPages(Math.ceil(sortedBlogs.length / blogsPerPage));
        } else {
          console.error('Error: response data is not an array');
          setBlogs([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, [blogsPerPage, blogId]); // Add blogId to the dependency array

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog).filter((blog, index) => index !== 0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReadMore = (blogId) => {
    navigate(`/BlogPost/${blogId}`);
  };

  return (
    <div>
      <div className="landing">
        <div className="landing-content">
          <h3>Discover the latest Blog Posts</h3>
          <p>Stay informed with our insightful article and helpful tips.</p>
          <a className="button-subscribe" href="#">Subscribe</a>
          <a className="button-readmore" href="#">Read more</a>
        </div>
        <div className="landing-image">
          <img src={readingimg} alt="image" />
        </div>
      </div>

      {blogId ? (
        <BlogPost blogId={blogId} />
      ) : (
        <>
          <div className="title-one">
            <h2>Recent Blog</h2>
          </div>
          <div className="hero-blog">
            {blogs.length > 0 && (
              <div className="hero-blog-item">
                <div className="hero-blog-content">
                  <img
                    src={`http://localhost:7700/images/${blogs[0].photo}`}
                    alt={blogs[0].title}
                  />
                  <h2>{blogs[0].title}</h2>
                  <p>{blogs[0].blogsnippet}</p>
                  <a className="button-readmore" onClick={() => handleReadMore(blogs[0]._id)}>
                    Read more
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="title-one">
            <h2>Older Blogs</h2>
          </div>
          <div className="blog-list">
            {currentBlogs.map((blog) => (
              <div key={blog._id} className="blog-item">
                {blog.photo ? (
                  <img src={`http://localhost:7700/images/${blog.photo}`} alt={blog.title} />
                ) : (
                  <p>No image available</p>
                )}
                <h2>{blog.title}</h2>
                <p>{blog.blogsnippet}</p>
                <a className="button-readmore" onClick={() => handleReadMore(blog._id)}>
                  Read more
                </a>
              </div>
            ))}
          </div>

          <Pagination className="custom-pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
                style={{
                  backgroundColor: page === currentPage ? '#7B2CBF' : '',
                  color: page === currentPage ? '#fff' : '',
                  border: page === currentPage ? 'none' : '',
                }}
              >
                {page}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}

      <Subscribe />
      <Footer />
    </div>
  );
};

export default Blog;
