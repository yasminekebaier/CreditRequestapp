 

import Login from "./Login";
import Navbarr from "./Components/Navbar/Navbarr";
import Home from "./Components/LandingPage/Home";
 import Agent from "./Agent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Clientdetails from "./Components/Clientdetails";

import Ocr from "./Ocr";
 import Login2 from "./Login2"
function App() {
  return (<div>
    <Router>
      <div className="App">
        <Navbarr />
        <div className="content">
          <Switch>
          <Route exact path="/">
               <Home/>
            </Route>
    <Route exact path="/login2">
               <Login2/>
            </Route>
            <Route exact path="/ocr">
               <Ocr/>
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
          </Switch>
        </div>
      </div>
    </Router>


  </div>
     
  );
}

export default App;
