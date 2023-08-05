import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './footer.css'
import React from 'react'

const Footer = () => {
  return (
    
          <>
    <footer className="footer">
      <div className="footer-section">
        <h3>About Us</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: CreditWise@example.com</p>
      </div>
      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a> 
        </div>

      </div>
    </footer>
    
    <p className="copyright">© 2023 Your Bankerise App. All rights reserved.</p>
    </>
   
  )
}

export default Footer