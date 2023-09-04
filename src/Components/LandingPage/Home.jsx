import { useState } from "react"
import About from "../About"
import Footer from "../Footer"
import Header from "../Header"
import Navbarr from "../Navbar/Navbarr"
import LanguageContext from "../Store/languageProvider"
import './Landing.css'
import { useTranslation } from 'react-i18next';
 

function Home() {
   const [language, setLanguage] = useState("en");
   const [t]=useTranslation("global")
  return (
    <>
 <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
        <Navbarr />
      </LanguageContext.Provider>
    
<section className="banner_main">
         <div className="container">
            <div className="row d_flex">
               <div className="col-md-5">
                  <div className="text-bg">
                     <h1>{t('1')}<br/> {t('2')}</h1>
                     <span>creditWise</span>
                     <p>{t('3')}</p>
                    
                  </div>
               </div>
               <div className="col-md-7">
                  <div className="text-img">
                     <figure><img src="images/img.png" /></figure>
                  </div>
               </div>
            </div>
         </div>
         <About/>
      </section>
      
      
     
     
      
  
  
     
     <Footer/>  
      </>
  )
}

export default Home
