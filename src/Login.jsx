/*import axios from "axios";*/
import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Navbarr from "./Components/Navbar/Navbarr";
import LanguageContext from "./Components/Store/languageProvider";
import { Formik, ErrorMessage, Form, Field } from "formik";

import "./Login.css"
import LoginSchema from "./validation/LoginSchema";


const Login = () => {
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();


  // const [userName, setuserName] = useState("");
  // const [password, setPassword] = useState("");

  // Set formik initial values 
  const initialValues = {
    userName: '',
    password: '',
  };

  useEffect(() => {
    // Check if the user is already authenticated
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // User is authenticated, check if the form is filled
      const hasFilledForm = localStorage.getItem("hasFilledForm");
      if (hasFilledForm) {
        //  history.push('/ocr');
        navigate('/ocr')
      } else {
        //  history.push("/manual");
        navigate('/manual')

      }
    }
  }, []);

  const [t] = useTranslation("global")


  const handleLogin = (values) => {
 
    axios({
      method: "post",
      url: `http://localhost:4000/login`,

      data: values
    }).then((res) => {
      navigate('/request-home');
      console.log('Login response:', res.data); // Ajoutez ce log pour vérifier la réponse de l'API de connexion

      localStorage.setItem('userName', res.data.user.userName);
      localStorage.setItem('userData', res.data.user);
      localStorage.setItem('role', res.data.user.role)
      localStorage.setItem('isLoggedIn', "true");
      const storedUserData = localStorage.getItem("userData") ?? JSON.parse(localStorage.getItem("userData"));

      const hasFilledForm = localStorage.getItem("hasFilledForm");
     
      const userRole = res.data.user.role;
    

      if (userRole === 'agent') {
        navigate("/agent")
    
      } else if (userRole === 'customer') {
        navigate('/request-home');
      }
    }).catch(error => {
      console.error("Login error:", error);
    });
  }

  return (
    <Fragment>
      <LanguageContext.Provider value={{ language: language, setLanguage: setLanguage }}>
        <Navbarr />
      </LanguageContext.Provider>
      <Fragment>

        <div className="h-screen w-full bg-gray-100 flex items-center justify-center  pt-20">
          <div className="w-[500px] h-fit py-[16px] bg-white rounded-3xl border-2 border-gray-300 p-8  ">
            <h1 className="text-[50px] font-medium text-center " style={{ "color": "#8955EF" }}>{t("Login")}  </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >

              <Form >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">{t("User name")}</label>
                  <Field name="userName" type="text" className="form-control input-field" id="text" />
                  <ErrorMessage className="error-message" name="userName" component="div" />
                  <div id="emailHelp" className="form-text">{t("bb")}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">{t("Password")}</label>
                  <Field name="password" type="password" className=" form-control input-field" id="exampleInputPassword1" />
                  <ErrorMessage className="error-message" name="password" component="div" />
                </div>
               {/* onClick={event => event.preventDefault()
                  } */}
                <div className="d-flex justify-content-center">
                  <button type="submit"  className="btn btn-outline text-center fs-7" style={{ "color": "#FFFFFF", "backgroundColor": "#8955EF" }}>{t("login")}</button>
                </div>

              </Form>
            </Formik>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
}

export default Login;