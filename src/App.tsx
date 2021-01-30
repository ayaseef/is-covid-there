import React from 'react';
import logo from './logo.svg';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import './App.css';

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
            <Route exact path="/">Home</Route>
            <Route exact path="/vaccine">Vaccine Component</Route>
            <Route exact path="/covid">Covid Data component</Route>
          </Switch>
      </div>
    </Router>
  );
}


export default App;
