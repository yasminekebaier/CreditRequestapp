import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './footer.css'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [t]=useTranslation("global")
  return (
    
          <>
    <footer className="footer">
      <div className="footer-section">
       {/*  <h3> {t('h')}</h3> */}
       <h3>CreditWise application </h3>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
      </div>
      <div className="footer-section">
        <h3>{t('i')}</h3>
        <a href="#">{t('Email')}: CreditWise@example.com</a>
      </div>
      <div className="footer-section">
        <h3>{t('j')}</h3>
        <div className="social-icons">
          <a href="#"><FaFacebook />Proxym-group</a>
          <a href="#"><FaInstagram />Proxym-group</a>
          <a href="#"><FaLinkedin />Proxym-group</a> 
        </div>

      </div>
    </footer>
    
    <p className="copyright">© {t('k')}</p>
    </>
   
  )
}

export default Footer