import React, { Fragment } from "react";
// import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { Link, useNavigate } from "react-router-dom";
/* import './ocr.css' */
import '../range.css'
import { useEffect, useState, useContext } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import AnimatedProgressProvider from "./AnimatedProgressProvider";
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios"
import { useTranslation } from 'react-i18next';
import translate from "translate";
import { transliterate as tr, slugify } from 'transliteration';
import Modal from 'react-modal';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Languagecontext from '../../Components/Store/languageProvider';
import LanguageContext from '../../Components/Store/languageProvider';

import Loader from "../../Components/Loader/Loader"
import LoanSimulator from "../../Components/LoanSimulator/LoanSimulator";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import Navbarr from "../../Components/Navbar/Navbarr";
import ImageUpload from "../../ImageUpload";




function Ocr() {

  // use Translator 
  const navigate = useNavigate();

  const [t] = useTranslation("global")

  //  create a request schema 

  const RequestSchema = yup.object().shape({
    name: yup.string().required(t("error1")).matches(/^[a-zA-Z\u0600-\u06FF\s]*$/, t("letter")).min(2, t("min")).max(30, t("max")),
    email: yup.string().email(t("error33")).required(t("error3")),
    surname: yup.string().required(t("error2")).matches(/^[a-zA-Z\u0600-\u06FF\s]*$/, t("letter")).min(2, t("min")),
    phone_number: yup.string().required(t("error4")).matches(/^[0-9]+$/, t("digits")).max(8, t("max8")),
    city: yup.string().required(t("error6")),
    address: yup.string().required(t("error7")),
    cin_number: yup.string().required(t("error8")).matches(/^[0-9]+$/, t("digits")).max(8, t("max8")),
    birth_date: yup.string().required(t("error9")),
    zipCode: yup.string().required(t("error10")).matches(/^[0-9]*$/, t("digits")).max(4, t("max4")),
    job: yup.string().required(t("error13")),
    motherName: yup.string().required(t("error14")).matches(/^[a-zA-Z\u0600-\u06FF\s]*$/, t("letter")).min(2, t("min")).max(30, t("max")),
    NID_creation_date: yup.string().required(t("error15"))
  })

  // get Data  from LocalStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem('role')
  const owner = localStorage.getItem("userName");

  const { language, setLanguage } = useContext(Languagecontext);
  const  [percentage,setPercentage]=useState(10); 
  const [amount, setAmount] = useState(0);
  const [month, setMonth] = useState(0);
  const [status, setStatus] = useState('Pending');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [src, selectFile] = useState(null)
  const [loadingFront, setLoadingFront] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [values, setValues] = useState({
    name: '', surname: '',
    email: '', phone_number: '', country: '',
    city: '', address: '', cin_number: '',
    birth_date: '', zipCode: '', gender: '',
    job: '', motherName: '', NID_creation_date: ''
  });

  // Get Credit data  to extarct it from the LoanSimulator  
  const getCreditData = (amount, month) => {
    setAmount(amount);
    setMonth(month);
  }
  //  get extracted values from the ocr loader  
  const getCinData = (data) => {
    setValues(data);
    console.log(data);
  }




  // }
  // const updateImage1 = (croppedImage) => {
  //   setImage1(croppedImage);
  // }
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [result, setResult] = useState(null)





  // const getcroppe = async () => {
  //   if (src) {
  //     const image = new Image();
  //     image.src = src;

  //     const scaleX = image.naturalWidth / image.width;
  //     const scaleY = image.naturalHeight / image.height;

  //     const canvas = document.createElement('canvas');
  //     canvas.width = crop.width;
  //     canvas.height = crop.height;

  //     const ctx = canvas.getContext('2d');

  //     await new Promise((resolve) => {
  //       image.onload = () => {
  //         ctx.drawImage(
  //           image,
  //           crop.x,
  //           crop.y,
  //           crop.width,
  //           crop.height,
  //           0,
  //           0,
  //           crop.width,
  //           crop.height
  //         );

  //         const base64Image = canvas.toDataURL('image/jpeg');
  //         setResult(base64Image);
  //         setCroppedImage(base64Image);
  //         resolve();
  //       };
  //     });
  //   }
  // };

  // //  handle input function  
  // function handleinput(event) {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [event.target.name]: event.target.value,
  //   }));
  // }

  useEffect(() => {
    (() => {
      'use strict'
      const forms = document.querySelectorAll('.needs-validation')
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault();
          }

          form.classList.add('was-validated')
        }, false)
      })
    })()
  }, []);





// Get Percentage  from the Loader 
const getLoaderPercentage=(value)=>{
  setPercentage(value); 
  console.log("the percentage is", percentage); 
}


  useEffect(() => {
    if (isLoggedIn == "false" || !role || role == "agent")
      navigate('/Login', { replace: true });



    console.log("the amount is ", amount);
    console.log("the month is ", month);


  }, [ month, amount, role, isLoggedIn])


  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
    resolver: yupResolver(RequestSchema),
  });

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

  //  HandleLoading  functions of loading  State via props 

  const handleLoadingFrontTrue = () => {
    try {
      setLoadingFront(true);
    }
    catch (error) {
      console.log("Error changin the state ", error)
    }

    console.log("the forntloading is  ", loadingFront);
  }
  const handleLoadingFrontFalse = () => {
    setLoadingBack(false);
    console.log("done ")
  }
  const handleLoadingBack = () => {
    setLoadingBack(true);
  }


  //  onSubit function  
  const onSubmit = async (data) => {
    setStatus("Pending");
    console.log('the data is ', data);
    const result = await axios.post('http://localhost:4000/creditRequest/new',
      { ...data, status, amount, month, owner });
    navigate('/request-home');
    console.log("the result is a succes ", result);

  };

  //  useEffect for values change 

  useEffect(() => {

    try {
      reset({
        ...getValues,
        name:values.name,
        surname:values.surname,
        email:values.email, 
        city: values.city,
        cin_number: values.cin_number,
        birth_date:values.birth_date,
        motherName: values.motherName,
        address: values.address,
        job: values.job,
        NID_creation_date: values.NID_creation_date,
      }
      )

    }
    catch (error) {
      console.log("the error", error);
    }
  }, [values])



  return (
    <Fragment>

      <LanguageContext.Provider value={{ language: language, setLanguage: setLanguage }}>
        <Navbarr />
      </LanguageContext.Provider>
      <div className="container">
        <div className="w-auto p-3 ">
          <div className="flex space-x-10 ...">
            <Link to='/manual' className="ml-4">{t('Manual')} </Link>
            <Link to='/ocr'>    {t('ocr')}</Link>
          </div>
          {/* place du  fragment upload image */}

          <ImageUpload language handleLoadingFrontTrue={handleLoadingFrontTrue} handleLoadingFrontFalse={handleLoadingFrontFalse} handleLoadingBack={handleLoadingBack} getCinData={getCinData} ></ImageUpload>

          {(loadingFront && loadingBack && percentage < 98) ?
            <Fragment >
          <Loader getLoaderPercentage={getLoaderPercentage}/>
            </Fragment>
            :
            <form className="row g-3 needs-validation  " onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">{t('First name')}</label>
                <input  type="text" className="form-control" id="validationCustom01" required {...register("name")} />
                <p>{errors.name?.message}</p>

              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">{t('Lastname')}</label>
                <input  type="text" className="form-control" id="validationCustom02" required {...register("surname")} />
                <p>{errors.surname?.message}</p>
              </div>
              <div className="col-md-4">
                <label htmlFor="validationCustomUsername" className="form-label">{t('Email')}</label>
                <div className="input-group has-validation">
                  <span className="input-group-text" id="inputGroupPrepend">@</span>
                  <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required  {...register("email")} />
                </div>
                <p>{errors.email?.message}</p>
              </div>

              <div className="col-md-4">
                <label htmlFor="Mobil Number" className="form-label">{t('Mobile Number')}</label>
                <input type="text" className="form-control" id="Mobil Number" required   {...register("phone_number")} />
                <p>{errors.phone_number?.message}</p>
              </div>



              <div className="col-md-4">
                <label htmlFor="validationCustom03" className="form-label">{t('City')}</label>
                <input type="text" className="form-control" id="validationCustom03" required   {...register("city")} />
                <p>{errors.city?.message}</p>
              </div>

              <div className="col-md-4">
                <label htmlFor="Address" className="form-label">{t('Address')}</label>
                <input type="text" className="form-control" id="Address" required {...register("address")} />
                <p>{errors.address?.message}</p>
              </div>


              <div className="col-md-4">
                <label htmlFor="NID" className="form-label"> {t('NID')}</label>
                <input  type="text" className="form-control" id="NID" required {...register("cin_number")} />
                <p>{errors.cin_number?.message}</p></div>

              <div className="col-md-4">
                <label htmlFor="birth_date" className="form-label"> {t('date')}</label>
                <input type="text" className="form-control" id="birth_date" required {...register("birth_date")} />
                <p>{errors.birth_date?.message}</p></div>

              <div className="col-md-4">
                <label htmlFor="validationCustom05" className="form-label">{t('Zip')}</label>
                <input  type="number" className="form-control" id="validationCustom05" required {...register("zipCode")} />
                <p>{errors.zipCode?.message}</p>
              </div>



              <div className="col-md-4">
                <label htmlFor="validationCustom111" className="form-label"> {t('JOB')}</label>
                <input  type="text" className="form-control" id="validationCustom111" required {...register("job")} />
                <p>{errors.job?.message}</p>
              </div>


              <div className="col-md-4">
                <label htmlFor="validationCustom112" className="form-label"> {t('mother name')}</label>
                <input  type="text" className="form-control" id="validationCustom112" required {...register("motherName")} />
                <p>{errors.motherName?.message}</p>
              </div>


              <div className="col-md-4">
                <label htmlFor="validationCustom113" className="form-label">{t('NIDdate')}</label>
                <input  type="text" className="form-control" id="validationCustom113" required {...register("NID_creation_date")} />
                <p>{errors.NID_creation_date?.message}</p>
              </div>


              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                  <label className="form-check-label" htmlFor="invalidCheck">
                    {t('conditions')}
                  </label>
                  <div className="invalid-feedback">
                    {t('error12')}
                  </div>
                </div>
              </div>
              <LoanSimulator getCreditData={getCreditData} Language={language} />
              <div className="row text-center mt-5 ">
                <div className="col-12">
                  <button type="submit" className="btn btn-outline-primary"   > {t('Send Request')} </button>
                </div>
              </div>

            </form>}

        </div>
      </div>
    </Fragment>
  )
}

export default Ocr; 
