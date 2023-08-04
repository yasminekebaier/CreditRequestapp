 

 import { useTranslation } from 'react-i18next';
import './Navbar.css'; // Importez le fichier CSS
import { Link } from "react-router-dom";


const Navbarr = () => {
  const [t,i18n]=useTranslation("global")
  const handelchange = (lang)=>{
   
    i18n.changeLanguage(lang);
  };
  return (

    <nav className="navbar">
   
      <div className="logo-container">
       <Link to='/'>  <img className="logo" src="./images/logo.png" alt="Logo de l'application" /></Link>
        <h1 className="nav-title1">creditWise</h1>
      </div>
       
      <div className="nav-links">
      <select onChange={(e)=>handelchange(e.target.value)} className="form-select-font-size-sm  mix-blend-color-dodge" aria-label="Default select example">
      <option value="en" selected >  ENGLISH </option>
      <option value="ar"  >  ARABE </option>
      
    </select>
     
        <Link className="nav-title" to="/login">{t("login")} </Link>
       
      </div>
   
    
    
    </nav>
  );
};

export default Navbarr;