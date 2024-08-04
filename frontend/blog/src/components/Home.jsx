import react from 'react';
import '../styles/HomeStyle.css';
import homeimg from '../assets/img9.png';
import Button from 'react-bootstrap/Button'
import GroupExample from './RecentPosts';
import Subscribe from './Subscribe';
import  Footer from './Footer';
import ControlledCarousel from './carousels';
function Home(){
      return(
        <>
          <div className="container">
            <div className='featured-welcome'>
            <h1 className="blog-title">Welcome to Kirub's Personal Blog</h1>
             <p className="blog-description">Explore a wide range of topics, from personal growth to creative pursuits.</p>
             <Button className='ms-6'>Subscribe to Newsletter</Button>
            </div>
            
             <div className="featured-image">
                  <img src={homeimg} alt="Featured Post Image" class="img-fluid"/>
             </div>
        </div>
        <ControlledCarousel/>
        <Subscribe/>
        < Footer/>
        </>
      )
}export default Home