import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navigation/navbar';
import Landing from './components/main/landing';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Profile from './components/profile/profile';
import AfterLogin from './services/after-login.service';
import BeforeLogin from './services/before-login.service';
import { Token } from './helpers/token.helper';

class App extends Component {
  render() {
    this.token = new Token();
    return (
      <Router>
        <div className="App">

          <Navbar />
          <Route exact path="/" component={Landing} />

          <div className="container">
            <BeforeLogin path='/login' exact component={Login} auth={!this.token.loggedIn()} />
            <BeforeLogin path='/signup' exact component={Signup} auth={!this.token.loggedIn()} />
            <AfterLogin path='/profile' exact component={Profile} auth={this.token.loggedIn()} />
          </div>

        </div>
      </Router>
    )
  }
}

export default App;