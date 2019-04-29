import React, { Component } from 'react';

import Login from './components/auth/Login';
import CreateUser from './components/auth/CreateUser';
import Header from './components/header/Header';
import Router from './config/Router';
import * as Auth from './config/Auth';

import './App.css';

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
      <div>
        <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'></link>
         <Header userAuthenticated={this.state.userAuthenticated}/>
         <Router userAuthenticated={this.state.userAuthenticated}/>
         {/* comment */}
      </div>
    );
  }
}

export default App;
