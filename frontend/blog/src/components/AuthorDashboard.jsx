import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DashboardStyle.css';
import img from '../assets/img28.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/LoginPage');
  };

  const navigateAddPost = () => {
    navigate('/AddNewPost');
  };

  
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">CodingLab</span>
        </div>
        <ul className="nav-links">
          <li>
            <div className="active" >
              Dashboard
            </div>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-heart"></i>
              <span className="links_name" onClick={navigateAddPost}>Manage Posts</span>
            </a>
          </li>
          <li className="log_out">
            <a href="#">
              <i className="bx bx-log-out"></i>
              <span className="links_name" onClick={handleLogout}>Log out</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="image">
        <img src={img} alt="image" />
      </div>
    </>
  );
};

export default Navbar;