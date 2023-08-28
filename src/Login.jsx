/*import axios from "axios";*/
import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Navbarr from "./Components/Navbar/Navbarr";
import LanguageContext from "./Components/Store/languageProvider";
const Login = () => {
  const [language, setLanguage] = useState("en");
  const history = useHistory();
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
   // Check if the user is already authenticated
   const storedUserData = localStorage.getItem("userData");
   if (storedUserData) {
     // User is authenticated, check if the form is filled
     const hasFilledForm = localStorage.getItem("hasFilledForm");
     if (hasFilledForm) {
       history.push("/request-home");
     } else {
       history.push("/manual");
     }
   }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:4000/login`,

      data: {
        userName,
        password,
      },
    }).then((res) => {
      console.log('Login response:', res.data); // Ajoutez ce log pour vérifier la réponse de l'API de connexion

      localStorage.setItem('userData', JSON.stringify("raniaaaaaaaaaaaaaa"));
      const storedUserData = localStorage.getItem("userData") ?? JSON.parse(localStorage.getItem("userData"));
      console.log('Stored user data:', storedUserData); // Ajoutez ce log pour vérifier les données utilisateur stockées

      const hasFilledForm = localStorage.getItem("hasFilledForm");
      console.log('hasFilledForm:', hasFilledForm); // Ajoutez ce log pour vérifier si hasFilledForm est défini

      const userRole = res.data.user.role;
      console.log('User role:', userRole); // Ajoutez ce log pour vérifier le rôle de l'utilisateur

      if (userRole === 'agent') {
        history.push('/agent');
      } else if (userRole === 'customer') {
        // Check if the form is filled
        if (hasFilledForm) {
          console.log('Redirecting to request-home'); // Ajoutez ce log pour vérifier la redirection
          history.push('/request-home');
        } else {
          console.log('Redirecting to manual'); // Ajoutez ce log pour vérifier la redirection
          history.push('/manual');
        }
      } else {
        console.error("Unknown user role:", userRole);
      }
    }).catch(error => {
      console.error("Login error:", error);
    });
  }

  const [t] = useTranslation("global")
 


  return (
    <>
    <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
    <Navbarr />
  </LanguageContext.Provider>
    <Fragment>

      <div className="h-screen w-full bg-gray-100 flex items-center justify-center  pt-20">
        <div className="w-[500px] h-fit py-[16px] bg-white rounded-3xl border-2 border-gray-300 p-8  ">
          <h1 className="text-[50px] font-medium text-center " style={{ "color": "#8955EF" }}>{t("Login")}  </h1>


          <form action="" onSubmit={handleLogin} id="sign-up-form" >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">{t("Email address")}</label>
              <input name="text" type="text" className="form-control" id="text" onChange={(e) => setuserName(e.target.value)} />
              <div id="emailHelp" className="form-text">{t("bb")}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">{t("Password")}</label>
              <input name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">{t("Check me out")}</label>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline text-center fs-7" style={{ "color": "#FFFFFF", "backgroundColor": "#8955EF" }}>{t("login")}</button>
            </div>

          </form>
        </div>
      </div>
    </Fragment>
    </>

  );


}
export default Login;