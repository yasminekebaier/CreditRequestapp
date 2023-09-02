import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import './range.css'
import LoanSimulator from './Components/LoanSimulator/LoanSimulator';
import { Link } from "react-router-dom";
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import LanguageContext from './Components/Store/languageProvider';
import Navbarr from './Components/Navbar/Navbarr';
import Login from './Login'

const CreditRequestManual = () => {
  const [language, setLanguage] = useState("en");
  const [amount,setAmount]=useState(0);
  const [month,setMonth]=useState(0);
  const isLoggedIn= localStorage.getItem("isLoggedIn");
  const role =localStorage.getItem('role')
  const navigate =useNavigate(); 
  // Handle Submit  
  const getCreditData =(amount,month)=>{
    setAmount(amount); 
    setMonth(month);}
    const owner=  localStorage.getItem("userName");
    console.log("the userData is ", owner); 

  const [t] = useTranslation("global")
  const [status, setStatus] = useState('Pending')
  const [values, setvalue] = useState({ name: '', surname: '', email: '', phone_number: '', city: '', address: '', cin_number: '', birth_date: '', zipCode: '', job: '', motherName: '', NID_creation_date: '' })


//  Handle input function  
  function handleinput(event) {
    setvalue((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
    console.log("the values are", values ); 
  }


const requestSchema= yup.object().shape({
  name:yup.string().required(t("error1")).matches(/^[aA-zZ]+$/,t("letter")) .min(2,t("min")).max(10,t("max")) ,
  email:yup.string().email(t("error33")).required(t("error3")),
  surname:yup.string().required(t("error2")).matches(/^[aA-zZ]+$/,t("letter")) .min(2,t("min")),
  phone_number:yup.string().required(t("error4")).matches(/^[0-9]+$/, t("digits")).max(8,t("max8")) ,
  city:yup.string().required(t("error6")),
  address:yup.string().required(t("error7")),
  cin_number:yup.string().required(t("error8")).matches(/^[0-9]+$/,t("digits")).max(8,t("max8"))  ,
  birth_date:yup.string() .required(t("error9")),
  zipCode:yup.string().required(t("error10")).matches(/^[0-9]+$/,t("digits")).max(4,t("max4")) ,
  job:yup.string().required(t("error13")),
  motherName:yup.string().required(t("error14")).matches(/^[ aA-zZ ]+$/,t("letter")) .min(2,t("min")).max(10,t("max")),
  NID_creation_date:yup .string() .required(t("error15"))})
  const {register,handleSubmit, formState:{errors}}=useForm({
    resolver : yupResolver(requestSchema),
  }) ;
  
useEffect(()=>{
  if (isLoggedIn=="false"|| !role)
  navigate('/', { replace: true });

})

  useEffect(() => {
    (() => {
      'use strict'

     
      const forms = document.querySelectorAll('.needs-validation')
 
     
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            
          }

          form.classList.add('was-validated')
        }, false)
      })
    })()
  }, []);
 
  // Submit  handler 
  const onSubmit = async(data) => {
    setStatus("Pending");
    console.log('the data is ',data);
    const result=  await axios.post('http://localhost:4000/creditRequest/new',
      {...data,status,amount,month,owner} );
      navigate('/request-home');
    console.log("the result is a succes ",result); 
    
  };
  

  return (
  <Fragment>
    <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
            <Navbarr />
          </LanguageContext.Provider>
     {isLoggedIn=="false" || !isLoggedIn ?(
      <Fragment>
        <Login></Login>
      </Fragment>
     ):     

   <div className="container">
    <div className="w-auto p-3 ">
      <div className="flex space-x-4 mb-5 ...">
        <Link to='/manual' className="ml-4">{t('Manual')}</Link>
        <Link to='/ocr'>  {t('ocr')}</Link>
      </div>

      <form className="row g-3 needs-validation  "    onSubmit={handleSubmit(onSubmit)}  noValidate>
 <div className="col-md-4">
   <label htmlFor="validationCustom01" className="form-label">{t('First name')}</label>
   <input name='name' type="text" className="form-control" id="validationCustom01" required {...register("name")}/>
   <p>{errors.name?.message}</p>
   
 </div>
 <div className="col-md-4">
   <label htmlFor="validationCustom02" className="form-label">{t('Lastname')}</label>
   <input name='surname' type="text" className="form-control" id="validationCustom02"   required {...register("surname")} />
   <p>{errors.surname?.message}</p>
 </div>
 <div className="col-md-4">
   <label htmlFor="validationCustomUsername" className="form-label">{t('Email')}</label>
   <div className="input-group has-validation">
     <span className="input-group-text" id="inputGroupPrepend">@</span>
     <input name='email' type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend"   required  {...register("email")}/>
   </div>
   <p>{errors.email?.message}</p>
 </div> 

 <div className="col-md-4">
   <label htmlFor="Mobil Number" className="form-label">{t('Mobile Number')}</label>
   <input name='phone_number' type="text" className="form-control" id="Mobil Number"    required   {...register("phone_number")}/>
   <p>{errors.phone_number?.message}</p>
 </div>
  


   <div className="col-md-4">
   <label htmlFor="validationCustom03" className="form-label">{t('City')}</label>
   <input name='city' type="text" className="form-control" id="validationCustom03" required   {...register("city")}/>
   <p>{errors. city?.message}</p>
 </div>

 <div className="col-md-4">
   <label htmlFor="Address" className="form-label">{t('Address')}</label>
   <input name='address' type="text" className="form-control" id="Address"  required {...register("address")}/>
   <p>{errors.address?.message}</p>
    </div>


   <div className="col-md-4">
   <label htmlFor="NID" className="form-label"> {t('NID')}</label>
   <input name='cin_number' type="text" className="form-control" id="NID"   required {...register("cin_number")}/>
   <p>{errors.cin_number?.message}</p></div>

   <div className="col-md-4">
   <label htmlFor="birth_date" className="form-label"> {t('date')}</label>
   <input name='birth_date' type="date" className="form-control" id="birth_date"  required {...register("birth_date")}/>
   <p>{errors.birth_date?.message}</p></div>
   
   <div className="col-md-4">
   <label htmlFor="validationCustom05" className="form-label">{t('Zip')}</label>
   <input name='zipCode' type="number" className="form-control" id="validationCustom05"   required {...register("zipCode")}/>
   <p>{errors.zipCode?.message}</p>
 </div>

 

 <div className="col-md-4">
   <label htmlFor="validationCustom111" className="form-label"> {t('JOB')}</label>
   <input name='job' type="text" className="form-control" id="validationCustom111" required {...register("job")}/>
   <p>{errors.job?.message}</p>
 </div>


 <div className="col-md-4">
   <label htmlFor="validationCustom112" className="form-label"> {t('mother name')}</label>
   <input name='motherName' type="text" className="form-control" id="validationCustom112"  required {...register("motherName")}/>
   <p>{errors.motherName?.message}</p>
 </div>


 <div className="col-md-4">
   <label htmlFor="validationCustom113" className="form-label">{t('NIDdate')}</label>
   <input name='NID_creation_date' type="date" className="form-control" id="validationCustom113"  required {...register("NID_creation_date")}/>
   <p>{errors.NID_creation_date?.message}</p>
 </div>
 

 <div className="col-12">
   <div className="form-check">
     <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
     <label className="form-check-label" htmlFor="invalidCheck">
      {t('conditions')}
     </label>
     <div className="invalid-feedback">
        {t('error12')}
     </div>
   </div>
 </div>
        <LoanSimulator  getCreditData={getCreditData} /> 
        <div className="row text-center mt-5 ">
                    <div className="col-12">
                        <button type="submit" className="btn btn-outline-primary"   > {t('Send Request')} </button>
                    </div>
                </div>

      </form>
  
    </div>
    
    </div>}
    </Fragment>
  )
}

export default CreditRequestManual; 
