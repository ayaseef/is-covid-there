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
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Resources from './components/Resources'



function App() {
  return (
    <div>
    <Router>
      <div>
        <Nav fill variant="tabs" defaultActiveKey="/">
        <Nav.Item >
          <Nav.Link className={'tabs'} eventKey="link-1" as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={'tabs'} eventKey="link-2" as={Link} to="/vaccine">Vaccine</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={'tabs'} eventKey="link-3" as={Link} to="/covid">Covid</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={'tabs'} eventKey="link-4" as={Link} to="/about">Resources</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        </Nav.Item>
      </Nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <HomeComponenet/>
              </Route>
            <Route exact path="/vaccine">
              <VaccineComponenet/>

            </Route>
            <Route exact path="/covid">
              <CovidComponenet/>
            </Route>
            <Route exact path="/about">
              <Resources/>
            </Route>
          </Switch>  
        <br></br>          
        <FooterData/>
      </div>
    </Router>
    </div>
  );
}


export default App;
