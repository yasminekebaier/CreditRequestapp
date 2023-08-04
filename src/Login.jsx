/*import axios from "axios";*/
import { useState } from "react";
 
 import { useTranslation } from 'react-i18next';
function Login(){

  const [t,i18n]=useTranslation("global")
 



   const [clients,setclients] = useState([{name:'',lastname:'',cin:'', birth:'',address:'',Email:''}]); 
  
  /*const handleName=(e)=>{
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
   }*/
    return(  
    <div className="h-screen w-full bg-gray-100 flex items-center justify-center  pt-20"> 
    <div className="w-[500px] h-fit py-[16px] bg-white rounded-3xl border-2 border-gray-300 p-8  ">
      <h1 className="text-[50px] font-medium">{t("login")} </h1>
      <p className="text-[18px]"> </p>
       
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">{t("Email address")}</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">{t("b")}</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">{t("Password")}</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">{t("Check me out")}</label>
  </div>
  
  <button type="submit" className="btn btn-primary">{t("login")}</button>
</form>

       
    </div>

  </div>
 
   
  
  );


}
export default Login;