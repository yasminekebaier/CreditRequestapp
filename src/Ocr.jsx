import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import './ocr.css'
import './range.css'
import { useEffect, useState } from 'react';
import axios from "axios"
import { useTranslation } from 'react-i18next';
import translate from "translate";
import Modal from 'react-modal';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


function Ocr() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [src ,selectFile]=useState(null)
  const handelfile = (e) =>{
      selectFile(URL.createObjectURL(e.target.files[0]))

  }
  const updateImage1 = (croppedImage) => {
    setImage1(croppedImage);
  }
  const [crop,setCrop]=useState({aspect: 16/ 9});
  const [result,setResult]=useState(null)
  const [image1, setImage1] = useState("images/CIN1.png");
  const [image2, setImage2] = useState("images/CIN2.png");
  const getcroppe = async () => {
    if (src) {
        const image = new Image();
        image.src = src;
  
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight /image.height;
  
        const canvas = document.createElement('canvas');
        canvas.width = crop.width;
        canvas.height = crop.height;
  
        const ctx = canvas.getContext('2d');
  
        await new Promise((resolve) => {
          image.onload = () => {
            ctx.drawImage(
              image,
              crop.x ,
              crop.y ,
              crop.width ,
              crop.height ,
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
 
  const[values,setValues]=useState({name:'',surname :'',email:'',phone_number:'',country:'',city:'',address:'',cin_number:'',birth_date:'',zipCode:'',gender:'',job:'',motherName:'',NID_creation_date:''})
  function handleinput(event){
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  }
  const [t]=useTranslation("global")
  useEffect(() => { 
    (() => {
      'use strict'
    
       
      const forms = document.querySelectorAll('.needs-validation')
    
     
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
    
          form.classList.add('was-validated')
        }, false)
      })
    })()
    }, []);


  const handleImageChange = async (event, setImageFunction) => {
    try {
      const text = await translate("أمين بن شرادة", { from: 'ar', to: 'en' });
      console.log(text);

    }
    catch(error ){
      console.log("the error is ", error )
    }
  
    

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

    try {
      const response = await axios.post('http://localhost:5000/flask_api/front_image_info', formData);
      setValues(prevValues => ({
        ...prevValues,
        name: response.data.data.cr_name1,
        surname: response.data.data.cr_surname,
        birth_Date: response.data.cr_birthDate,
        city: response.data.data.cr_state,
        cin_number: response.data.data.cr_number,

      }));
      const [t]=useTranslation("global")


    } catch (error) {
      console.error(error);
    }
  
  
  
  }

  return (
   
    <div className="w-auto p-3 ">
    <div className="flex space-x-4 ..."> 
<Link to='/login2'>{t('Manuel')}</Link>
<Link to='/ocr'>    {t('ocr')}</Link>
</div>
<div className="images-container row">
  <div className="col-md-6">
    <div className="image-with-button">
      <label htmlFor="image-upload1">
      <img src={croppedImage || image1} alt="Image 1" />
        <span className="blue-button">{t('Download')}</span>
        <button className='btn btn-primary' onClick={() => setModalIsOpen(true)}>Crop</button>
       {/*  model */}
       <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Recadrage d'image"
>
  {/* Contenu de la fenêtre modale */}
  <div className='row'>
    <div className='col-6'>
      <input type='file' accept='image/*' onChange={handelfile}/>
    </div>
    {src && (
  <div className='clo-6' >
    <ReactCrop crop={crop} onImageLoaded={setImage1} onChange={setCrop}>
      <img src={src} alt='Selected for cropping' style={{ display: 'block', maxWidth: '100%', maxHeight: '100%' }} />
    </ReactCrop>
    <button className='btn btn-danger' onClick={async () => {
      console.log("the value of the image has changed ",result )
      await getcroppe();
      setModalIsOpen(false);
      updateImage1(result); // Mettre à jour l'image1 avec le résultat du recadrage
      
    

    }}>Crop image</button>
  </div>
)}
  </div>
 
</Modal>
{/* finmodel */}
      </label>
    
      
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
    
    <form className="row g-3 needs-validation  " noValidate>
 <div className="col-md-4">
   <label htmlFor="validationCustom01" className="form-label">{t("First name")}</label>
   <input name='name' type="text" className="form-control" id="validationCustom01"value={values.name} onChange={handleinput}  required/>
   <div className="invalid-feedback">
   {t('error1')}
      </div>
   
 </div>
 <div className="col-md-4">
   <label htmlFor="validationCustom02" className="form-label">{t("Lastname")}</label> 
   <input name='surname' type="text" className="form-control" id="validationCustom02"value={values.surname} onChange={handleinput}    required/>
   <div className="invalid-feedback">
   {t('error2')}
     </div>
 </div>
 <div className="col-md-4">
   <label htmlFor="validationCustomUsername" className="form-label">{t("Email")}</label>
   <div className="input-group has-validation">
     <span className="input-group-text" id="inputGroupPrepend">@</span>
     <input name='email' type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend"  value={values.email} onChange={handleinput}  required/>
     <div className="invalid-feedback">
     {t('error3')}
     </div>
   </div>
 </div> 

 <div className="col-md-4">
   <label htmlFor="Mobil Number" className="form-label">{t("Mobile Number")}</label> 
   <input name='phone_number' type="text" className="form-control" id="Mobil Number" value={values.phone_number}  onChange={handleinput}   required/>
   <div className="invalid-feedback">
   {t('error4')}
   </div>
 </div>
 <div className="col-md-4">
   <label htmlFor="country" className="form-label">{t("Country")}</label>
   <input name='country' type="text" className="form-control" id="Country" value={values.country} onChange={handleinput}  required/>
   <div className="invalid-feedback">
   {t('error5')}
   </div></div>


   <div className="col-md-4">
   <label htmlFor="validationCustom03" className="form-label">{t("City")}</label>
   <input name='city' type="text" className="form-control" id="validationCustom03" value={values.city}  onChange={handleinput}  required/>
   <div className="invalid-feedback">
   {t('error6')}
   </div>
 </div>

 <div className="col-md-4">
   <label htmlFor="Address" className="form-label">{t("Address")}</label>
   <input name='address' type="text" className="form-control" id="Address" value={values.address} onChange={handleinput}  required/>
   <div className="invalid-feedback">
   {t('error7')}
   </div></div>


   <div className="col-md-4">
   <label htmlFor="NID" className="form-label">{t("NID")}</label>
   <input name='cin_number' type="text" className="form-control" id="NID" value={values.cin_number}  onChange={handleinput}  required/>
   <div className="invalid-feedback">
   {t('error8')}
   </div></div>

   <div className="col-md-4">
   <label htmlFor="birth_date" className="form-label">{t('date')}</label>
   <input name='birth_date' type="date" className="form-control" id="birth_date" value={values.birth_date} onChange={handleinput}  required/>
   <div className="invalid-feedback">
   {t('error9')}
   </div></div>
   
   <div className="col-md-4">
   <label htmlFor="validationCustom05" className="form-label">{t("Zip")}</label>
   <input name='zipCode' type="text" className="form-control" id="validationCustom05" value={values.zipCode} onChange={handleinput}  required/>
   <div className="invalid-feedback">
   {t('error10')}
   </div>
 </div>

 <div className="col-md-4">
   <label htmlFor="validationCustom111" className="form-label"> {t('JOB')}</label>
   <input name='job' type="text" className="form-control" id="validationCustom111" onChange={handleinput}  required/>
   <div className="invalid-feedback">
      {t('error13')}
   </div>
 </div>


 <div className="col-md-4">
   <label htmlFor="validationCustom112" className="form-label"> {t('mother name')}</label>
   <input name='motherName' type="text" className="form-control" id="validationCustom112" onChange={handleinput}  required/>
   <div className="invalid-feedback">
      {t('error14')}
   </div>
 </div>


 <div className="col-md-4">
   <label htmlFor="validationCustom113" className="form-label">{t('NIDdate')}</label>
   <input name='NID_creation_date' type="date" className="form-control" id="validationCustom113" onChange={handleinput}  required/>
   <div className="invalid-feedback">
      {t('error15')}
   </div>
 </div>

  
 <div className="col-md-3">
   <label htmlFor="validationCustom04" className="form-label">
 </label>
   <select name='gender' className="form-select" id="validationCustom04" onChange={handleinput}  required>
     <option selected disabled value="">{t('Gender')}</option>
     <option value='m'>{t('male')}</option>
     <option value='f' >{t('female')}</option>
   </select>
   <div className="invalid-feedback">
   {t('error11')}
   </div>
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
 
 



 <label className="form-label" htmlFor="customRange1">{t('Loan term')}</label>
<div className="position-relative">
<div className="range">
  <div className="position-absolute top-0 start-0">{t('1Month')}</div>
  <div className="position-absolute top-0 end-0">{t('240Month')}</div>
  <div className="position-absolute top-50 start-50"></div><input name="month" type="range" className="form-range" min="1" max="240" id="customRange1" value={values.month}   onChange={handleinput} step='1'/>
  <h1>{values.month}{t('Month')}</h1></div></div>
 
 



  <label className="form-label" htmlFor="customRange2">{t('Loan Amount')}</label>
<div className="position-relative">
<div className="range">
  <div className="position-absolute top-0 start-0">5000</div>
  <div className="position-absolute top-0 end-0">100000</div>
  <div className="position-absolute top-50 start-50"></div><input name="amount" type="range" className="form-range" min="5000" max="100000"   id="customRange2" value={values.amount} onChange={handleinput} step='100'/>
  <h1>{values.amount}{t('TND')}</h1></div></div>
 

 
 <div className="col-12">
 <button className="btn btn-outline-primary" type="submit">finish </button>
 </div>
  
</form>
     </div> 
  )
}

export default Ocr
