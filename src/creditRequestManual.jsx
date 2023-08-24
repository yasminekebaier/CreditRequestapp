import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import './range.css'
import LoanSimulator from './Components/LoanSimulator/LoanSimulator';
const CreditRequestManual = () => {

  const [amount,setAmount]=useState(0);
  const [month,setMonth]=useState(0);
  // Handle Submit  
  const getCreditData =(amount,month)=>{
    setAmount(amount); 
    setMonth(month);}

  const [t] = useTranslation("global")
  const [status, setStatus] = useState('Deny')
  const [values, setvalue] = useState({ name: '', surname: '', email: '', phone_number: '', city: '', address: '', cin_number: '', birth_date: '', zipCode: '', job: '', motherName: '', NID_creation_date: '' })
  function handleinput(event) {
    setvalue((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  }
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

  function handelsabmit(event) {
    setStatus("Pending");
    console.log('Before form submission');

    event.preventDefault()
    axios({
      method: "post",
      url: `http://localhost:4000/creditRequest/new`,
      data: { ...values, status: 'pending' }



    }).then((res) => {

      console.log("Registration successful");
    }).catch(error => {
      console.error("Registration error:", error);
    });
  }
  // Submit  handler 
const submitHandler= async(event)=>{
  event.preventDefault()
  const  status= 'pending'
  const result=  await axios.post('http://localhost:4000/creditRequest/new',{...values,status,amount,month} );
  console.log("the result is a succes ", result); 
}

  return (

    <div className="w-auto p-3 ">
      <div className="flex space-x-4 ...">
        <Link to='/login2'>{t('Manuel')}</Link>
        <Link to='/ocr'>  {t('ocr')}</Link>
      </div>

      <form className="row g-3 needs-validation  " onSubmit={handelsabmit} noValidate>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">{t('First name')}</label>
          <input name='name' type="text" className="form-control" id="validationCustom01" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error1')}
          </div>

        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">{t('Lastname')}</label>
          <input name='surname' type="text" className="form-control" id="validationCustom02" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error2')}
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">{t('Email')}</label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">@</span>
            <input name='email' type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" onChange={handleinput} required />
            <div className="invalid-feedback">
              {t('error3')}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="Mobil Number" className="form-label">{t('Mobile Number')}</label>
          <input name='phone_number' type="text" className="form-control" id="Mobil Number" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error4')}
          </div>
        </div>
        {/* <div className="col-md-4">
          <label htmlFor="country" className="form-label">{t('Country')}</label>
          <input name='country' type="text" className="form-control" id="Country" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error5')}
          </div></div> */}


        <div className="col-md-4">
          <label htmlFor="validationCustom03" className="form-label">{t('City')}</label>
          <input name='city' type="text" className="form-control" id="validationCustom03" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error6')}
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="Address" className="form-label">{t('Address')}</label>
          <input name='address' type="text" className="form-control" id="Address" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error7')}
          </div></div>


        <div className="col-md-4">
          <label htmlFor="NID" className="form-label"> {t('NID')}</label>
          <input name='cin_number' type="text" className="form-control" id="NID" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error8')}
          </div></div>

        <div className="col-md-4">
          <label htmlFor="birth_date" className="form-label"> {t('date')}</label>
          <input name='birth_date' type="date" className="form-control" id="birth_date" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error9')}
          </div></div>

        <div className="col-md-4">
          <label htmlFor="validationCustom05" className="form-label">{t('Zip')}</label>
          <input name='zipCode' type="text" className="form-control" id="validationCustom05" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error10')}
          </div>
        </div>



        <div className="col-md-4">
          <label htmlFor="validationCustom111" className="form-label"> {t('JOB')}</label>
          <input name='job' type="text" className="form-control" id="validationCustom111" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error13')}
          </div>
        </div>


        <div className="col-md-4">
          <label htmlFor="validationCustom112" className="form-label"> {t('mother name')}</label>
          <input name='motherName' type="text" className="form-control" id="validationCustom112" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error14')}
          </div>
        </div>


        <div className="col-md-4">
          <label htmlFor="validationCustom113" className="form-label">{t('NIDdate')}</label>
          <input name='NID_creation_date' type="date" className="form-control" id="validationCustom113" onChange={handleinput} required />
          <div className="invalid-feedback">
            {t('error15')}
          </div>
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
        <LoanSimulator  getCreditData={getCreditData} /> 
        <div className="row text-center mt-5 ">
                    <div className="col-12">
                        <button className="btn btn-outline-primary" onClick={submitHandler}>{t('Send Request')} </button>
                    </div>
                </div>

      </form>
    
    </div>
  )
}

export default CreditRequestManual; 
