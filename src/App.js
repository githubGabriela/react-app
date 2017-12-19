import React, { Component } from 'react';
import './App.css';

import Router from './config/Router';

class App extends Component {
  render() {
    return (
      <div>
        <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'></link>
        <Router/>
      </div>
    );
  }
}

export default App;
