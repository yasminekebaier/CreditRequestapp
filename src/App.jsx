 

import Login from "./Login";
import Navbarr from "./Navbarr";
 import Agent from "./Agent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (<div>
    <Router>
      <div className="App">
        <Navbarr />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/agent">
              <Agent />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>


  </div>
     
  );
}

export default App;
