import React, { Fragment } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import './ocr.css'
import './range.css'
import { useEffect, useState, useContext } from 'react';
import axios from "axios"
import { useTranslation } from 'react-i18next';
import translate from "translate";
import { transliterate as tr, slugify } from 'transliteration';
import Modal from 'react-modal';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Languagecontext from "./Components/Store/languageProvider";
import Loader from "./Components/Loader/Loader"
import LoanSimulator from "./Components/LoanSimulator/LoanSimulator";
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';



function Ocr( ) {
  const [loading, setLoading] = useState(false);

  const { language, setLanguage } = useContext(Languagecontext); 
  const [amount,setAmount]=useState(0);
  const [month,setMonth]=useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [src, selectFile] = useState(null)

// Get Credit data  to extarct it from the LoanSimulator  
const getCreditData =(amount,month)=>{
  setAmount(amount); 
  setMonth(month);
} 



  const handelfile = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]))

  }
  const updateImage1 = (croppedImage) => {
    setImage1(croppedImage);
  }
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [result, setResult] = useState(null)
  const [image1, setImage1] = useState("images/CIN1.png");
  const [image2, setImage2] = useState("images/CIN2.png");
  const [values, setValues] = useState({ name: '', surname: '', email: '', phone_number: '', country: '', city: '', address: '', cin_number: '', birth_date: '', zipCode: '', gender: '', job: '', motherName: '', NID_creation_date: '' })

  // handle the language change  
  async function onLanguageChange(language) {

    // arabic variables 
    try {

      if (language == 'ar') {
        // English variables  
        const ar_mother_name = await translate(values.motherName, { from: 'en', to: 'ar' });
        const ar_job = await translate(values.job, { from: 'en', to: 'ar' });
        const ar_address = await translate(values.address, { from: 'en', to: 'ar' });
        const ar_NID_date = await translate(values.NID_creation_date, { from: 'en', to: 'ar' });
        console.log(ar_mother_name)

        setValues(prevValues => ({

          ...prevValues,
          motherName: ar_mother_name,
          job: ar_job,
          address: ar_address,
          NID_creation_date: ar_NID_date
        }));

      }

      if (language == 'en') {
        // English variables  
        const en_mother_name = await tr(values.motherName);
        const en_job = await translate(values.job, { from: 'ar', to: 'en' });
        const en_address = await translate(values.address, { from: 'ar', to: 'en' });
        const en_NID_date = await translate(values.NID_creation_date, { from: 'ar', to: 'en' });

        setValues(prevValues => ({

          ...prevValues,
          motherName: en_mother_name,
          job: en_job,
          address: en_address,
          NID_creation_date: en_NID_date
        }));

      }
    }
    catch (err) {
      console.log("catch it   ", err)
    }
  }
//  Submit Handler 

const submitHandler= async(event)=>{
  event.preventDefault()
  const  status= 'pending'
  const result=  await axios.post('http://localhost:4000/creditRequest/new',{...values,status,amount,month} );
  console.log("the result is a succes ", result); 
}

  const getcroppe = async () => {
    if (src) {
      const image = new Image();
      image.src = src;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext('2d');

      await new Promise((resolve) => {
        image.onload = () => {
          ctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height
          );

          const base64Image = canvas.toDataURL('image/jpeg');
          setResult(base64Image);
          setCroppedImage(base64Image);
          resolve();
        };
      });
    }
  };

  //  handle input function  
  function handleinput(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  }












  









  const [t] = useTranslation("global")

  // using another useEffect may be correct one  
  useEffect(() => {

    console.log("the language is", language)
    onLanguageChange(language)

    console.log("the amount is ",amount); 
    console.log("the month is ",month);


  }, [language, setValues,month, amount]) 


  const userSchema= yup.object().shape({
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
      resolver : yupResolver(userSchema),
    }) ;


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




  const handleImageChange = async (event, setImageFunction) => {

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFunction(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    //  send axios request to flak api 
    if (event.target.id == "image-upload1") {

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/flask_api/front_image_info', formData);
        
        setLoading(false)
        // added code 
        if (language === 'ar') {
          setValues(prevValues => ({
            ...prevValues,
            name: response.data.data.cr_name1 + response.data.data.cr_name2,
            surname: response.data.data.cr_surname,
            birth_Date: response.data.cr_birthDate,
            city: response.data.data.cr_state,
            cin_number: response.data.data.cr_number,

          }));
        }

        else {
          const en_name = await tr(response.data.data.cr_name1+ response.data.data.cr_name2)
          const en_surname = await translate(response.data.data.cr_surname, { from: 'ar', to: 'en' },);
          const en_birth_Date = await translate(response.data.cr_birthDate, { from: 'ar', to: 'en' });
          const en_city = await translate(response.data.data.cr_state, { from: 'ar', to: 'en' });
          const en_cin_number = await translate(response.data.data.cr_number, { from: 'ar', to: 'en' });
          setValues(prevValues => ({
            ...prevValues,
            name: en_name,
            surname:en_surname,
            birth_Date: en_birth_Date,
            city: en_city ,
            cin_number: en_cin_number,
          }));

        }
      }
      catch (error) {
        console.error(error);
      }
    }

    try {
      setLoading(true)
      const startTime = performance.now();
      const response = await axios.post('http://localhost:5000/flask_api/back_image_info', formData);
      const endTime = performance.now();
      const timeTaken = endTime - startTime;
      
      console.log("the response is ", response)
      //  translate all the items in the form
      // await translate(  response.data.data.mother_name, { from: 'ar', to: 'en' });

      setLoading(false);
      if (language === 'ar') {
        setValues(prevValues => ({
          ...prevValues,
          motherName: response.data.data.mother_name,
          job: response.data.data.work,
          address: response.data.data.address,
          NID_creation_date: response.data.data.mother_name,

        }));
      }
      else {
        const trans_mother_name = await tr(response.data.data.mother_name)
        const trans_work = await translate(response.data.data.work, { from: 'ar', to: 'en' });
        const trans_address = await translate(response.data.data.address, { from: 'ar', to: 'en' });
        const trans_NID_creation_date = await translate(response.data.data.creation_date, { from: 'ar', to: 'en' });
        setValues(prevValues => ({
          ...prevValues,
          motherName: trans_mother_name,
          job: trans_work,
          address: trans_address,
          NID_creation_date: trans_NID_creation_date,
        }));

      }
    }
    catch (err) {
      console.log("the error is ", err);
    }
  }

  return (

    <div className="w-auto p-3 ">
      <div className="flex space-x-10 ...">
        <Link to='/manual' className="ml-4">{t('Manual')} </Link>
        <Link to='/ocr'>    {t('ocr')}</Link>
      </div>
      <div className="images-container row">
        <div className="col-md-6">
          <div className="image-with-button">
            <label htmlFor="image-upload1">
              {/* croppedImage || */}
              <img src={image1} alt="Image 1"
              />
              <span className="blue-button">{t('Download')}</span>
              {/* <button className='btn btn-primary' onClick={() => setModalIsOpen(true)}>Crop</button> */}
              {/*  model */}
              {/*  ?????????????????? this is the place of Yasmine croping code      ??????????????? */}
              {/*  */}
              {/* finmodel */}
            </label>
            {/* Added cod by Ahmed   */}
            <input
              type="file"
              id="image-upload1"
              name="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setImage1)}
              style={{ display: "none" }}
            />


          </div>
        </div>
        <div className="col-md-6">
          <div className="image-with-button">
            <label htmlFor="image-upload2">
              <img src={image2} alt="Image 2" />
              <span className="blue-button">{t('Download')}</span>
            </label>
            <input
              type="file"
              id="image-upload2"
              name="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setImage2)}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
      {loading ?
        <Fragment>
          <Loader />
        </Fragment>
        :
        <form className="row g-3 needs-validation  "  onSubmit={handleSubmit(submitHandler)} noValidate>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">{t("First name")}</label>
          <input name='name' type="text" className="form-control" id="validationCustom01" value={values.name} onChange={handleinput} required {...register("name")} />
          <p>{errors.name?.message}</p>

        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">{t("Lastname")}</label>
          <input name='surname' type="text" className="form-control" id="validationCustom02" value={values.surname} onChange={handleinput} required {...register("surname")}/>
          <p>{errors.surname?.message}</p>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">{t("Email")}</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">@</span>
            <input name='email' type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={values.email} onChange={handleinput} required {...register("email")} />
             
          </div>
          <p>{errors.email?.message}</p>
        </div>

        <div className="col-md-4">
          <label htmlFor="Mobile Number" className="form-label">{t("Mobile Number")}</label>
          <input name='phone_number' type="text" className="form-control" id="Mobile Number" value={values.phone_number} onChange={handleinput} required {...register("phone_number")}/>
          <p>{errors.phone_number?.message}</p>
        </div>
       { /* <div className="col-md-4">
          <label htmlFor="country" className="form-label">{t("Country")}</label>
          <input name='country' type="text" className="form-control" id="Country" value={values.country} onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error5')}
          </div></div> */}


        <div className="col-md-4">
          <label htmlFor="validationCustom03" className="form-label">{t("City")}</label>
          <input name='city' type="text" className="form-control" id="validationCustom03" value={values.city} onChange={handleinput} required {...register("city")}/>
          <p>{errors.city?.message}</p>
        </div>

        <div className="col-md-4">
          <label htmlFor="Address" className="form-label">{t("Address")}</label>
          <input name='address' type="text" className="form-control" id="Address" value={values.address} onChange={handleinput} required {...register("address")}/>
          <p>{errors.address?.message}</p></div>


        <div className="col-md-4">
          <label htmlFor="NID" className="form-label">{t("NID")}</label>
          <input name='cin_number' type="text" className="form-control" id="NID" value={values.cin_number} onChange={handleinput} required {...register("cin_number")}/>
          <p>{errors.cin_number?.message}</p></div>

        <div className="col-md-4">
          <label htmlFor="birth_date" className="form-label">{t('date')}</label>
          <input name='birth_date' type="text" className="form-control" id="birth_date" value={values.birth_date} onChange={handleinput} required {...register("birth_date")}/>
          <p>{errors.birth_date?.message}</p></div>

        <div className="col-md-4">
          <label htmlFor="validationCustom05" className="form-label">{t("Zip")}</label>
          <input name='zipCode' type="text" className="form-control" id="validationCustom05" value={values.zipCode} onChange={handleinput} required {...register("zipCode")}/>
          <p>{errors.zipCode?.message}</p>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustom111" className="form-label"> {t('JOB')}</label>
          <input name='job' type="text" className="form-control" id="validationCustom111" value={values.job} onChange={handleinput} required {...register("job")}/>
          <p>{errors.job?.message}</p>
        </div>


        <div className="col-md-4">
          <label htmlFor="validationCustom112" className="form-label"> {t('mother name')}</label>
          <input name='motherName' type="text" className="form-control" id="validationCustom112" value={values.motherName} onChange={handleinput} required {...register("motherName")}/>
          <p>{errors.motherName?.message}</p>
        </div>


        <div className="col-md-4">
          <label htmlFor="validationCustom113" className="form-label">{t('NIDdate')}</label>
          <input name='NID_creation_date' type="text" className="form-control" id="validationCustom113" value={values.NID_creation_date} onChange={handleinput} required {...register("NID_creation_date")}/>
          <p>{errors.NID_creation_date?.message}</p>
        </div>


        {/* <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">
          </label>
          <select name='gender' className="form-select" id="validationCustom04" onChange={handleinput} required>
            <option selected disabled value="">{t('Gender')}</option>
            <option value='m'>{t('male')}</option>
            <option value='f' >{t('female')}</option>
          </select>
          <div className="invalid-feedback">
            {t('error11')}
          </div>
        </div> */}

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
          <br />
          <br />
          <br />

          {/*  Loan Simulator  */}
          {/**/}
          <LoanSimulator  getCreditData={getCreditData} /> 
          {/* Submit button */}
          <div className="row text-center mt-5 ">
                    <div className="col-12">
                        <button  type="submit" className="btn btn-outline-primary"  >{t('Send Request')} </button>
                    </div>
                </div>

        </form>}
    </div>
  )
}

export default Ocr
