import React, { Component } from 'react';
import './App.css';

import Login from './components/auth/Login';
import CreateUser from './components/auth/CreateUser';
import Router from './config/Router';
import Header from './components/header/Header';
import * as Auth from './config/Auth';

class App extends Component {
  constructor(){
    super();
    this.state = {
      userAuthenticated : undefined
    }
  }

  componentDidMount(){
    Auth.isAuthenticated(user => {
      this.setState({
        userAuthenticated: user
      })
    });
  }

  render() {
    return (
      <div className="main-app">
        <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'></link>
        { !this.state.userAuthenticated ? 
        <CreateUser/>
        //<Login/>
          : 
          <div>
            <Header user={this.state.userAuthenticated}/>
            <Router/>
          </div>
        }
      </div>
    );
  }
}

export default App;
