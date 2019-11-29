import React from 'react';
import './App.css';
import Login from './Components/Login.js'
import Home from './Components/Home.js'
import { Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
          <Router>
            <div>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />
            </div>
          </Router>
    </div>
  );
}

export default App;
