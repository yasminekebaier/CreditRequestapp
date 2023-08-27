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
      </section>
      
      <div id="why" className="why">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="titlepage">
                     <h2>{t('4')}</h2>
                     <p>making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still </p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div id="box_ho" className="why-box">
                     <i><img src="images/why1.png" alt="#" /></i>
                     <h3>the taxes</h3>
                     <p>making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still </p>
                  </div>
                  <a className="read_more bg" href="#">Read More</a>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div className="why-box">
                     <i><img src="images/why2.png" alt="#" /></i>
                     <h3>savings simulator</h3>
                     <p>making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still </p>
                  </div>
                  <a className="read_more bg" href="#">Read More</a>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div className="why-box">
                     <i><img src="images/why3.png" alt="#" /></i>
                     <h3>credit simulator</h3>
                     <p>making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still </p>
                  </div>
                  <a className="read_more bg" href="#">Read More</a>
               </div>
            </div>
         </div>
      </div>
     
      
  
  
      <About/>
     <Footer/>  
      </>
  )
}

export default Home
