import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../styles/NavbarStyle.css';
import RegisterLogin from '../components/RegisterLogin';

function NavbarComponent() {
  const [showRegisterLogin, setShowRegisterLogin] = useState(false);

  const handleLoginClick = () => {
    setShowRegisterLogin(true);
  };

  const handleCloseRegisterLogin = () => {
    setShowRegisterLogin(false);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top" style={{ height: 'auto' }}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" style={{ lineHeight: 'normal' }}>
            Kirub's <span>Blog</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ lineHeight: 'normal' }}>
            <Nav className="ms-auto d-flex align-items-center" style={{ lineHeight: 'normal' }}>
              <Nav.Link as={Link} to="/" style={{ lineHeight: 'normal' }}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Blog" style={{ lineHeight: 'normal' }}>
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/About" style={{ lineHeight: 'normal' }}>
                About Me
              </Nav.Link>
              <Nav.Link as={Link} to="/Contact" style={{ lineHeight: 'normal' }}>
                Contact
              </Nav.Link>
              <Button
                variant="primary"
                className="ms-4"
                style={{ lineHeight: 'normal' }}
                onClick={handleLoginClick}
              >
                Log In
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showRegisterLogin && (
        <div className="register-login-container position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <RegisterLogin onClose={handleCloseRegisterLogin} />
        </div>
      )}
    </>
  );
}

export default NavbarComponent;