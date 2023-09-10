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
        <h1> {t('About us')} </h1>
        <p className="text-secondary"> {t('footer_info')}</p>
      </div>
      <div className="footer-section">
        <h3>{t('i')}</h3>
        <p className="text-secondary">{t('Email')}: CreditWise@example.com</p>
      </div>
      <div className="footer-section">
        <h3>{t('j')}</h3>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a> 
        </div>

      </div>
    </footer>
    
    <p className="copyright">© {t('k')}</p>
    </>
   
  )
}

export default Footer