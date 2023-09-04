import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/Login";
import Navbarr from "./Components/Navbar/Navbarr";
import Home from "./Components/LandingPage/Home";
import Agent from "./Pages/Agent";
import Clientdetails from "./Pages/Clientdetails";
import LanguageContext from './Components/Store/languageProvider';
import CreditRequestManual from "./Pages/creditRequestManual";
import RequestRedirect from './Components/Redirect/RequestRedirect';
import Ocr from "./Pages/Ocr/Ocr";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [language, setLanguage] = useState("en");
  const [userRole, setUserRole] = useState("");

  const handleLogin = (e) => {
    // Your handleLogin logic here
  }

  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manual" element={<CreditRequestManual />} />
              <Route path="/ocr" element={
                <LanguageContext.Provider value={{ language: language, setLanguage: setLanguage }}>
                  <Ocr />
                </LanguageContext.Provider>
              } />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<div>Logout</div>} />
              <Route path="/agent" element={<Agent/>} />
              <Route path="/client/:id" element={<Clientdetails />} />
              <Route path="/request-home" element={<RequestRedirect />} />
             
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
