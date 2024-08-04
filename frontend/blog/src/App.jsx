import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponent';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import AddNewPost from './components/AddPost';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import LoginPage from './components/LoginPage';
import  BlogDashboard from './components/Dashboard';
import AdminManagement from './components/AdminManagement';
import AuthorDashboard from './components/AuthorDashboard';

function App() {
  
  return (
    <>
      <Router>
         <NavbarComponent/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/Blog" element={<Blog/>}/>
            <Route path="/AddNewPost" element={<AddNewPost/>}/>
            <Route path="/BlogPost/:blogId" element={<BlogPost />} />
            <Route path="/BlogDashboard" element={<BlogDashboard/>}/>
            <Route path="/AdminManagement" element={<AdminManagement/>}/>
            <Route path="/AuthorDashboard" element={<AuthorDashboard/>}/>
            <Route path="/LoginPage" element={<LoginPage/>}/>
        </Routes>
      </Router>
     
    </>
  );
}

export default App
