import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import './App.css';
import CovidData from './components/api/CovidDataApi'
import VaccineData from './components/api/VaccineDataApi'
import FooterData from './components/Footer'
import CovidComponenet from './components/covid/CovidParentComponent'
import VaccineComponenet from './components/vaccine/VaccineParentComponent'
import HomeComponenet from './components/home/HomeParentComponent'
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
;


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/vaccine">Vaccine Data</Link></li>
          <li><Link to="/covid">Covid Data</Link></li>
        </ul>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <HomeComponenet/>
              </Route>
            <Route exact path="/vaccine">
              <VaccineComponenet/>
            {/* <VaccineData stateName={"Alaska"} info={'LongName'} map={true}/> */}
            </Route>
            <Route exact path="/covid">
              <CovidComponenet/>
            </Route>
          </Switch>            
          <FooterData/>
      </div>
    </Router>
  );
}


export default App;
