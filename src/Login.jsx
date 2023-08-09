/*import axios from "axios";*/
import axios from "axios";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

 import { useTranslation } from 'react-i18next';
const Login=() =>{
  const history = useHistory();
  const [userName,setuserName] = useState("");
  const[password,setPassword] =useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url:`http://localhost:4000/login`,
     
      data:{
        userName,
        password,
      },
    }).then((res) => {
      
      const userRole = res.data.user.role;
     
      if (userRole === 'agent') {
        history.push('/agent'); 
      } else if (userRole === 'customer') {
        history.push('/login2'); 
      } else {
       
        console.error("Unknown user role:", userRole);
      }
    })  .catch(error => {
      console.error("Login error:", error);
    });
  }

  const [t]=useTranslation("global")
  /* const[values,setvalue]=useState({ email:'',password:''}) */
 /*  function handleinput(event){
    const newobj={...values,[event.target.name]:event.target.value}
    setvalue(newobj)
  } */



  
   
    return( 
      <> 
   
     <div className="h-screen w-full bg-gray-100 flex items-center justify-center  pt-20"> 
    <div className="w-[500px] h-fit py-[16px] bg-white rounded-3xl border-2 border-gray-300 p-8  ">
      <h1 className="text-[50px] font-medium">{t("login")}  </h1>
       
       
      <form action="" onSubmit={handleLogin} id="sign-up-form" >
  <div className="mb-3">
    <label htmlFor="name" className="form-label">{t("Email address")}</label>
    <input name="text" type="text" className="form-control" id="text"   onChange ={(e)=> setuserName(e.target.value)}/>
    <div id="emailHelp" className="form-text">{t("b")}</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">{t("Password")}</label>
    <input name="password" type="password" className="form-control" id="exampleInputPassword1"  onChange ={(e)=> setPassword(e.target.value)}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">{t("Check me out")}</label>
  </div>
   
  <button type="submit" className="btn btn-outline-primary">{t("login")}</button>
</form>

       
    </div>

  </div> 
 
 </>
  
  );


}
export default Login;