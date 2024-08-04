import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/ContactStyle.css';
import contactImage from '../assets/img11.png';
import Subscribe from './Subscribe';
import Footer from './Footer';

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_l89uv0q', 'template_xwegywz', form.current, 'Y_eoAC5HB4q6HmQAk')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <>
    <div className='contact-header'>
      <h2>Contact Us</h2>
    </div>
       <div className='contact-container'>
      <div className='contact-image'>
        <img src={contactImage} alt='image' />
      </div>
      <div className='contact-form '>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      </div>
      </div>
      <Subscribe />
      <Footer />
    </>  
  );
}

export default Contact;