 

import Login from "./Login";
import Navbarr from "./Navbarr";
 import Agent from "./Agent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Clientdetails from "./Clientdetails";
import Home from "./Home";
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
