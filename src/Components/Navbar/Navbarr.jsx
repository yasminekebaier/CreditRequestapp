import React, { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css'; // Importez le fichier CSS
import { Link } from "react-router-dom";
import LanguageContext from '../Store/languageProvider';
import { Navigate } from 'react-router-dom';



const Navbarr = () => {
  const logoUrl = `${window.location.origin}/images/logo.png`;
  // const history = useHistory();
  const {language, setLanguage} = useContext(LanguageContext);
  const [t, i18n] = useTranslation("global")
  // const [isLoggedOut, setIsLoggedOut]=useState("false"); 
  
  const storedUserData = localStorage.getItem("userData") ??JSON.parse(localStorage.getItem("userData"))
 
  const  languageHandler=(lang)=> {

    setLanguage(lang);

  }
  
  const handelchange = (lang) => {
    i18n.changeLanguage(lang);
    if (lang === "ar") { document.body.dir = 'rtl' }
    else { document.body.dir = 'ltr' }
  };
  const handleLogout = (e) => {
      
     console.log("Why is not redirecting"); 
    localStorage.removeItem('userData');
    localStorage.removeItem('userName'); 
    localStorage.setItem('isLoggedIn',"false"); 
    window.location.reload();

   
    
    
  };
  return (
    <Fragment>

      <nav className="navbar">
      <div className="container"> 
          <div className="logo-container">
          <Link to='/'>  <img className='logo' src={logoUrl} alt="Logo"   /></Link>
          <h1 className="nav-title1">creditWise</h1>
        </div>

        <div className="nav-links">
          <select value={language} style={{"borderRadius":"10px"}} onChange={(e) => {
            handelchange(e.target.value),
            languageHandler(e.target.value)
          }}
            className="form-select-font-size-sm  mix-blend-color-dodge"
            aria-label="Default select example">
            <option value="en" selected > {t("ENGLISH")} </option>
            <option value="ar"  >  {t("ARABIC")} </option>

          </select>
          {storedUserData!=null   ? (
            <>
         
           <Link className="nav-title"  onClick={handleLogout}><button className="btn  btn text-white fs-6" 
           style ={{"backgroundColor":"#8955EF" ,  "borderRadius":"10px"}}> {t("Logout")}
            </button></Link> </>
        ) : (
          // User is logged out, show Login link
          <Link className="nav-title" to="/login"><button className="btn  btn text-white fs-6" style ={{"backgroundColor":"#9c30a4" ,  "borderRadius":"10px"}}>{t("login")}
            </button></Link>
        )}

        </div>
        </div>  
      </nav>
    
      </Fragment>
 
  );
};

export default Navbarr;