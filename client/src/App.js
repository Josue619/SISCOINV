import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navigation/navbar';
import Landing from './components/main/landing';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Profile from './components/profile/profile';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Navbar />
          <Route exact path="/" component={Landing} />

          <div className="container">
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </div>

        </div>
      </Router>
    )
  }
}

export default App;