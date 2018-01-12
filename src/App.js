import React, { Component } from 'react';
import './App.css';

import Login from './components/auth/Login';
import CreateUser from './components/auth/CreateUser';
import Router from './config/Router';
import * as Auth from './config/Auth';

class App extends Component {
  constructor(){
    super();
    this.state = {
      authenticated : false
    }
  }

  componentDidMount(){
    Auth.isAuthenticated(result => {
      this.setState({
        authenticated: result
      })
    });
  }

  render() {
    return (
      <div className="main-app">
        <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'></link>
        { !this.state.authenticated ? 
          // <CreateUser/>
          <Login/>
          : 
          <Router/>
        }
      </div>
    );
  }
}

export default App;
