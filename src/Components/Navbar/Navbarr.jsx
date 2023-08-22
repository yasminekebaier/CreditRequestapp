
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css'; // Importez le fichier CSS
import { Link } from "react-router-dom";
import LanguageContext from '../Store/languageProvider';


const Navbarr = () => {

 
  const {language, setLanguage} = useContext(LanguageContext);
  const [t, i18n] = useTranslation("global")
  
 
  const  languageHandler=(lang)=> {
    setLanguage(lang);
    console.log("language handler is ",language)
   
  }
  
  const handelchange = (lang) => {
    i18n.changeLanguage(lang);
    if (lang === "ar") { document.body.dir = 'rtl' }
    else { document.body.dir = 'ltr' }


  };
  return (
      <nav className="navbar">
        <div className="logo-container">
          <Link to='/'>  <img className="logo" src="./images/logo.png" alt="Logo de l'application" /></Link>
          <h1 className="nav-title1">creditWise</h1>
        </div>

        <div className="nav-links">
          <select value={language} onChange={(e) => {
            handelchange(e.target.value),
            languageHandler(e.target.value)
          }}
            className="form-select-font-size-sm  mix-blend-color-dodge"
            aria-label="Default select example">
            <option value="en" selected > {t("ENGLISH")} </option>
            <option value="ar"  >  {t("ARABE")} </option>

          </select>

          <Link className="nav-title" to="/login">{t("login")} </Link>

        </div>
      </nav>
  
  );
};

export default Navbarr;