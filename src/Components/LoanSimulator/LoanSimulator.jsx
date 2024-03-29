import React, { useState, useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import "./LoanSimulator.css";

const LoanSimulator = (props) => {
    const [amount, setAmount] = useState(5000);
    const [month, setMonth] = useState(1);
    const [interest, setInterest] = useState(5);
    const [monthPayement, setMonthPayement] = useState(5250);
    const [totalPayement, setTotalPayement] = useState(5250);
    const [languageDirection,setLanguageDirection]=useState('ltr'); 
    // const [languageChange,setLanguageChange]=useState('en'); 

   
    const [t, i18n] = useTranslation("global")
    const myStyle = {
        directiion:'ltr', 
      };
      const  [dynamicStyle,setDynamicStyle]=useState(myStyle)

    function roundToDecimalPlaces(number, decimalPlaces) {
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(number * factor) / factor;
      }


    const handleMonth = (event) => {
        event.preventDefault();
        setMonth(event.target.value)
    }
    const handleAmount = (event) => {
        event.preventDefault();
        setAmount(event.target.value)
    }
    

    const LoanCalculator = () => {
        if (month!== 0){
            const nb_years= Math.ceil(month/12)  
            // console.log("number of years ",nb_years );
            // console.log("the interest is ", interest);
            const total_Payement= amount*(1+(nb_years*interest/100) )
            const month_Payement= amount*(1+(nb_years*interest/100) )/month
            setTotalPayement(roundToDecimalPlaces(total_Payement,1))
            setMonthPayement(roundToDecimalPlaces(month_Payement,1))
     
        }

    }
// Handle Language change 
const handelchange = (lang) => {
    i18n.changeLanguage(lang);
    if (lang === "ar") { document.body.dir = 'rtl' }
    else { document.body.dir = 'ltr' }
  };

    useEffect(()=>{

        // handelchange(props.language); 

        console.log( "the language from the props is ", props.Language)

        if(props.Language =="ar" ){
            console.log("I'm  ara"); 
            // setLanguageChange("ar"); 
        }
        else{
            console.log("I'm an english man "); 
            // setLanguageChange("en")
        }
    },[props.Language])

    useEffect(()=>{
        LoanCalculator()

    props.getCreditData(amount,month)
    },[month,amount])

    

    return (
        <Fragment>
            <section className="bg-light ">
            <div className="container " >
                <h1  className="text-center mt-5" style={{ fontSize: '40px', color: "#55448A" ,}}>{t('10')}</h1>
                <br />
                <div className="row justify-content-center align-items-center">
                    {/* Column left */}
                    <div className="col-md-6  col-xl-6 col-sm-12 text-center text-md-start">
                    <div className="card ">
                            <div className="card-body">
                            <div className="card-text text-center fs-5">{t('Loan Amount')}</div>
                     { props.Language === "en" ? (
                        <Fragment>
                        <div className="position-relative d-flex justify-content-center align-items-center  text-center mt-4 ">
                            <div className="range ">
                                <div className="position-absolute top-0  start-0" style={{direction:'ltr'}} >{t('5000')}</div>
                                <div className="position-absolute top-0 end-0" style={{direction:'ltr'}}>{t('100000')}</div>
                                <div className="position-absolute top-50 start-50"></div><input name="amount" type="range" className="form-range" min="5000" max="100000" id="customRange2" value={amount} onChange={handleAmount} step='100' />
                                <h1 className="mt-2 nb-3  text-primary">{amount}   {t('TND')}</h1></div>          
                        </div>
                        <br />
                      <hr />
                      <br/>
                        <div className="card-text text-center fs-5">{t('Loan term')}</div>
                       
                        <div className="position-relative d-flex justify-content-center align-items-center text-center  text-center mt-4 ">
                            <div className="range ">
                                <div  className="position-absolute top-0 start-0" style={{direction:'ltr'}} >{t('1')}</div>
                                <div className="position-absolute top-0 end-0"style={{direction:'ltr'}}>{t('240')}</div>
                                <div className="position-absolute top-50 start-50"></div><input name="month" type="range" className="form-range" min="1" max="240" id="customRange1" value={month} onChange={handleMonth} step='1' />
                                <h1 className="mt-3 text-primary">{month}    {t('Month')}</h1></div>
                        </div>
                        </Fragment>
                        ):
                        <Fragment>
                        <div className="position-relative d-flex justify-content-center align-items-center  text-center mt-4 ">
                            <div className="range ">
                                <div className="position-absolute top-0  start-0 pr-3" style={{direction:'ltr'}} >{t('100000')}</div>
                                <div className="position-absolute top-0 end-0" style={{direction:'ltr'}}>{t('5000')}</div>
                                <div className="position-absolute top-50 start-50"></div><input name="amount" type="range" className="form-range" min="5000" max="100000" id="customRange2" value={amount} onChange={handleAmount} step='100' />
                                <h1 className="mt-2 nb-3  text-primary">{amount}   {t('TND')}</h1></div>          
                        </div>
                        <br />
                      <hr />
                      <br/>
                        <div className="card-text text-center fs-5">{t('Loan term')}</div>
                       
                        <div className="position-relative d-flex justify-content-center align-items-center text-center  text-center mt-4 ">
                            <div className="range ">
                                <div  className="position-absolute top-0 start-0" style={{direction:'ltr'}} >{t('240')}</div>
                                <div className="position-absolute top-0 end-0"style={{direction:'ltr'}}>{t('1')}</div>
                                <div className="position-absolute top-50 start-50"></div><input name="month" type="range" className="form-range" min="1" max="240" id="customRange1" value={month} onChange={handleMonth} step='1' />
                                <h1 className="mt-3 text-primary">{month}    {t('Month')}</h1></div>
                        </div>
                        </Fragment>


}
                        </div></div>
                    </div>
                    {/* Column Right */}
                    <div className="col-md-6  col-xl-6 col-sm-12 text-center ">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-text">{t('Interest')}</h3>
                                <div className="border border-primary p-1 mb-3 text-center">
                                  <h1 className="fs-2 mt-2">{interest} %</h1> 
                                </div>
                                <h3 className="card-text">{t('Monthly Payement')}</h3>
                                <div className="border border p-1 mb-3">
                                  <h1 className="fs-1 mt-2  text-primary">{monthPayement}   {t('TND')}</h1> 
                                </div>
                                <h3 className="card-text">{t('Total Payement')}</h3>
                                <div className="border border-primary p-1">
                                  <h1 className="fs-2 mt-2">{totalPayement}  {t('TND')}</h1> 
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            </section>
        </Fragment>
    )

} 
export default LoanSimulator;

