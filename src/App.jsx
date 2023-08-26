import React,{useState} from 'react'
import Login from "./Login";
import Navbarr from "./Components/Navbar/Navbarr";
import Home from "./Components/LandingPage/Home";
 import Agent from "./Agent";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Clientdetails from "./Components/Clientdetails";
import LanguageContext from './Components/Store/languageProvider';
import CreditRequestManual from "./creditRequestManual"
import RequestRedirect from './Components/Redirect/RequestRedirect';

import Ocr from "./Ocr";

function App() {
  const [language, setLanguage] = useState("en");

  return (

  <React.Fragment>    
    <Router>
      <div className="App">
      <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
        <Navbarr />
      </LanguageContext.Provider>
        <div className="content">
          <Switch>
          <Route exact path="/">
               <Home/>
            </Route>
    <Route exact path="/manual">
               <CreditRequestManual/>
            </Route>
           
            <Route exact path="/ocr">
            <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
               <Ocr/>
            </LanguageContext.Provider>
            </Route>
           
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/agent">
              <Agent />
            </Route>
            <Route path="/client/:id">
              <Clientdetails />
            </Route>
            <Route exact path="/request-home">
              <RequestRedirect />
            </Route>
           
          </Switch>
          
        </div>
      </div>
    </Router>
    </React.Fragment>
     
  );
}

export default App;
