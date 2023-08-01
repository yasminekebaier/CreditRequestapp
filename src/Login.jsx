import axios from "axios";
import { useState } from "react";
 import { Link } from 'react-router-dom';
 
function Login(){
   const [clients,setclients] = useState([{name:'',lastname:'',cin:'', birth:'',address:'',Email:''}]); 
  
  const handleName=(e)=>{
    setclients( ...clients,  clients.name =e.target.value )
  }; 
  const handlelastname=(e)=>{
    setclients( ...clients,  clients.lastname =e.target.value )
  }; 
  const handlecin=(e)=>{
    setclients( ...clients,  clients.cin =e.target.value )
  }; 
  const handleemail=(e)=>{
    setclients( ...clients,  clients.Email =e.target.value )
  }; 
  const handlebirth=(e)=>{
    setclients( ...clients,  clients.birth =e.target.value )
  }; 
  const handleaddress=(e)=>{
    setclients( ...clients,  clients.address =e.target.value )
  }; 
  const handlesubmit=(e)=>{
    e.preventDefault() 
    axios.get('', clients ).then((res)=> console.log(res.data))  
   }
    return(  
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center  pt-20"> 
    <div className="w-[500px] h-fit py-[16px] bg-white rounded-3xl border-2 border-gray-300 p-8  ">
      <h1 className="text-[50px] font-medium">Personal Information:  </h1>
      <p className="text-[18px]"> </p>
       
      <form>
      <div className="mb-3">
  <label htmlFor=" Input1" className="form-label">Name</label>
  <input type="text" className="form-control" id=" Input1" placeholder="name " onChange={handleName}/>
</div>
  <div className="mb-3">
  <label htmlFor="Input2" className="form-label">LastName </label>
  <input type="text" className="form-control" id="Input2" placeholder=" LastName" onChange={handlelastname}/>
</div>
  <div className="mb-3">
  <label htmlFor=" Input3" className="form-label">Date of birth</label>
  <input type="date" className="form-control" id="Input3" placeholder="jj/mm/aa"onChange={handlebirth}/>
</div>
  <div className="mb-3">
  <label htmlFor="Input4" className="form-label">National ID</label>
  <input type="text" className="form-control" id="Input4" placeholder="National ID" onChange={handlecin}/>
</div>
  <div className="mb-3">
  <label htmlFor="Input5" className="form-label">Residential address</label>
  <input type="text" className="form-control" id=" Input5" placeholder="Residential address"onChange={handleaddress}/>
</div>
  <div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"onChange={handleemail}/>
</div>
<div className="btn-group" role="group" aria-label="Basic example">
 <Link to="/login2">  <button type="button" className="btn btn-outline-primary"/* onClick={handlesubmit}*/>Next</button></Link>
  <Link to="/ocr"> <button type="button" className="btn btn-outline-primary">OCR</button></Link> 
 
</div>
      </form>

       
    </div>

  </div>
 
   
  
  );


}
export default Login;