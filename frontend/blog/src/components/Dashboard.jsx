import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/DashboardStyle.css';
import img from '../assets/img28.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch the user ID from your application state or session
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserData(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userName && userRole) {
      console.log(`Username: ${userName}`);
      console.log(`Role: ${userRole}`);
    }
  }, [userName, userRole]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7700/api/UserNameAndRole/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const userData = await response.json();
      setUserName(userData.name);
      setUserRole(userData.role);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/LoginPage');
  };

  const navigateAddPost = () => {
    navigate('/AddNewPost');
  };

  const navigateAdminManagement = () => {
    navigate('/AdminManagement');
  };
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">CodingLab</span>
        </div>
        <div className="profile">
          <div className="profile-details">
            <div className="name-job">
              <div className="name">{userName}</div>
              <div className="job">{userRole}</div>
            </div>
          </div>
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
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name" onClick={navigateAdminManagement}>Manage Users</span>
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