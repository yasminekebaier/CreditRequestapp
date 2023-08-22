 import React,{useState} from 'react'
import Login from "./Login";
import Navbarr from "./Components/Navbar/Navbarr";
import Home from "./Components/LandingPage/Home";
 import Agent from "./Agent";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Clientdetails from "./Components/Clientdetails";
import LanguageContext from './Components/Store/languageProvider';


import Ocr from "./Ocr";
 import Login2 from "./Login2"
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
    <Route exact path="/login2">
               <Login2/>
            </Route>
            <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
            <Route exact path="/ocr">
               <Ocr/>
            </Route>
            </LanguageContext.Provider>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/agent">
              <Agent />
            </Route>
            <Route path="/client/:id">
              <Clientdetails />
            </Route>
          </Switch>
          
        </div>
      </div>
    </Router>
    </React.Fragment>
     
  );
}

export default App;
