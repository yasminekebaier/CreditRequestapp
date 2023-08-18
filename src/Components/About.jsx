import React from 'react'
import { useTranslation } from 'react-i18next';
const About = () => {
   const [t]=useTranslation("global")
  return (
    <>
<div id="service" className="Services">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="titlepage">
                     <h2> {t('a')}</h2>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div className="Services-box">
                     <i><img src="images/svg/006-credit-card.svg" alt="#" /></i>
                     <h3> {t('b')}</h3>
                     <p>{t('c')}</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div className="Services-box">
                     <i><img src="/images/svg/002-rich.svg" alt="#" /></i>
                     <h3>{t('d')}</h3>
                     <p>{t('e')}</p>
                  </div>
               </div>
               <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div className="Services-box">
                     <i><img src="/images/svg/003-notes.svg" alt="#" /></i>
                     <h3>{t('f')}</h3>
                     <p> {t('g')}</p>
                  </div>
               </div>
              
             
             
               
            </div>
         </div>
      </div>
      </>
  )
}

export default About