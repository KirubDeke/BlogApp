import '../styles/AboutStyle.css';
import img4 from '../assets/img7.png';
import Subscribe from './Subscribe';
import  Footer from './Footer';
function About(){
    return(
        <>
         <div className="about-us">
           <div className="about">
        <img src={img4} className="pic" />
        <div className="text">
          <h3>About Me</h3>
          <h5>Fullstack Developer & <span>Designer</span></h5>
          <p>As a full-stack developer, I possess a diverse skill set that allows me to work on all aspects of web application development. I'm well-versed in front-end and back-end technologies, including HTML, CSS, JavaScript, React, Node.js, and various databases. I'm always eager to learn new tools and stay up-to-date with the latest industry trends.

My focus is on writing clean, maintainable, and efficient code that delivers a seamless user experience. I'm a strong communicator and collaborator, able to work closely with cross-functional teams to ensure that the final product meets the project's requirements and exceeds the client's expectations.

In my free time, I enjoy exploring new technologies, participating in outdoor activities, and giving back to the community through volunteering and mentoring initiatives.</p>
          <div className="data">
            <a href="#" className="hire">Hire Me</a>
          </div>
        </div>
      </div>
    </div>
    < Subscribe/>
    < Footer/>
        </>
    )
}export default About;