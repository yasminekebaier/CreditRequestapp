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
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [language, setLanguage] = useState("en");
  const [userRole, setUserRole] = useState("");
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
      // ...
      const fetchedUserRole = res.data.user.role; // Utilisez une variable distincte pour le rôle d'utilisateur obtenu depuis la réponse
      setUserRole(fetchedUserRole); // Stockez 
      console.log("User role after login:", fetchedUserRole);
    }).catch(error => {
      console.error("Login error:", error);
    });
  }


  return (

  <React.Fragment>    
    <Router>
      <div className="App">
     
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
            <Route exact path="/logout">
             
            </Route>
            <Route path="/agent" component={Agent} />
            <PrivateRoute
  path="/agent"
  component={Agent}
  isAuthenticated={isAuthenticated}
  allowedRoles={['agent']}
  userRole={userRole} // Pass the user role here
/>
       
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
