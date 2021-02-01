import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import './App.css';
import CovidData from './components/api/CovidDataApi'
import VaccineData from './components/api/VaccineDataApi'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/vaccine">Vaccine Data</Link></li>
          <li><Link to="/covid">Covid Data</Link></li>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">Home component</Route>
            <Route exact path="/vaccine">Vaccine component
            <VaccineData stateName={"WA"} vaccineProperty={"LongName"} map={true}/>
            </Route>
            <Route exact path="/covid">Covid component</Route>
          </Switch>
      </div>
    </Router>
  );
}


export default App;
