import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import './range.css'
function Login2() {
const [status,setStatus]= useState('Deny')
 const[values,setvalue]=useState({name:'',surname :'',email:'',phone_number:'',country:'',city:'',address:'',cin_number:'',birth_date:'',zipCode:'',gender:''})
function handleinput(event){
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

function handelsabmit(event){
  setStatus("Pending");
  console.log('Before form submission');

event.preventDefault()
axios({
  method: "post",
  url:`http://localhost:4000/creditRequest/new`,
  data: {...values,status:'pending'}
 
 
  
}).then((res) => {
  
  console.log("Registration successful");
})  .catch(error => {
  console.error("Registration error:", error);
});
}


  return (
 
    <div className="w-auto p-3 ">
     <div className="flex space-x-4 ..."> 
 <Link to='/login2'>Manuel</Link>
 <Link to='/ocr'>OCR </Link>
 </div>

 <form className="row g-3 needs-validation  "  onSubmit={handelsabmit}  noValidate>
 <div className="col-md-4">
   <label htmlFor="validationCustom01" className="form-label">First name</label>
   <input name='name' type="text" className="form-control" id="validationCustom01" onChange={handleinput}  required/>
   <div className="invalid-feedback">
   Please choose a name.
      </div>
   
 </div>
 <div className="col-md-4">
   <label htmlFor="validationCustom02" className="form-label">Lastname</label>
   <input name='surname' type="text" className="form-control" id="validationCustom02" onChange={handleinput}    required/>
   <div className="invalid-feedback">
       Please choose a lastname.
     </div>
 </div>
 <div className="col-md-4">
   <label htmlFor="validationCustomUsername" className="form-label">Email</label>
   <div className="input-group has-validation">
     <span className="input-group-text" id="inputGroupPrepend">@</span>
     <input name='email' type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" onChange={handleinput}  required/>
     <div className="invalid-feedback">
       Please provide a Email.
     </div>
   </div>
 </div> 

 <div className="col-md-4">
   <label htmlFor="Mobil Number" className="form-label">Mobil Number</label>
   <input name='phone_number' type="text" className="form-control" id="Mobil Number" onChange={handleinput}   required/>
   <div className="invalid-feedback">
     Please provide a  Mobil Number.
   </div>
 </div>
 <div className="col-md-4">
   <label htmlFor="country" className="form-label">Country</label>
   <input name='country' type="text" className="form-control" id="Country" onChange={handleinput}  required/>
   <div className="invalid-feedback">
     Please provide a valid Country.
   </div></div>


   <div className="col-md-4">
   <label htmlFor="validationCustom03" className="form-label">City</label>
   <input name='city' type="text" className="form-control" id="validationCustom03" onChange={handleinput}  required/>
   <div className="invalid-feedback">
     Please provide a valid city.
   </div>
 </div>

 <div className="col-md-4">
   <label htmlFor="Address" className="form-label">Address</label>
   <input name='address' type="text" className="form-control" id="Address" onChange={handleinput}  required/>
   <div className="invalid-feedback">
     Please provide a valid Address.
   </div></div>


   <div className="col-md-4">
   <label htmlFor="NID" className="form-label">NID</label>
   <input name='cin_number' type="text" className="form-control" id="NID" onChange={handleinput}  required/>
   <div className="invalid-feedback">
     Please provide a valid NID.
   </div></div>

   <div className="col-md-4">
   <label htmlFor="birth_date" className="form-label">date of birth</label>
   <input name='birth_date' type="date" className="form-control" id="birth_date" onChange={handleinput}  required/>
   <div className="invalid-feedback">
     Please provide a valid date of birth.
   </div></div>
   
   <div className="col-md-3">
   <label htmlFor="validationCustom05" className="form-label">Zip</label>
   <input name='zipCode' type="text" className="form-control" id="validationCustom05" onChange={handleinput}  required/>
   <div className="invalid-feedback">
     Please provide a valid zip.
   </div>
 </div>

  
 <div className="col-md-3">
   <label htmlFor="validationCustom04" className="form-label">
 </label>
   <select name='gender' className="form-select" id="validationCustom04" onChange={handleinput}  required>
     <option selected disabled value="">Gender</option>
     <option value='m'>male</option>
     <option value='f' >female</option>
   </select>
   <div className="invalid-feedback">
     Please select a valid Gender.
   </div>
 </div>

 <div className="col-12">
   <div className="form-check">
     <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
     <label className="form-check-label" htmlFor="invalidCheck">
       Agree to terms and conditions
     </label>
     <div className="invalid-feedback">
       You must agree before submitting.
     </div>
   </div>
 </div>
 
 



 <label className="form-label" htmlFor="customRange1">Loan term</label>
<div className="position-relative">
<div className="range">
  <div className="position-absolute top-0 start-0">1Month</div>
  <div className="position-absolute top-0 end-0">240Month</div>
  <div className="position-absolute top-50 start-50"></div><input name="month" type="range" className="form-range" min="1" max="240" id="customRange1" value={values.month}   onChange={handleinput} step='1'/>
  <h1>{values.month}Month</h1></div></div>
 
 



  <label className="form-label" htmlFor="customRange2">Loan Amount</label>
<div className="position-relative">
<div className="range">
  <div className="position-absolute top-0 start-0">5000</div>
  <div className="position-absolute top-0 end-0">100000</div>
  <div className="position-absolute top-50 start-50"></div><input name="amount" type="range" className="form-range" min="5000" max="100000"   id="customRange2" value={values.amount} onChange={handleinput} step='100'/>
  <h1>{values.amount}TND</h1></div></div>
 

 
 <div className="col-12">
   <button className="btn btn-outline-primary" type="submit">Submit form</button>
 </div>
  
</form>
      </div> 
  )
}

export default Login2
