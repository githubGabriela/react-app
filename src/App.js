import React, { Component } from 'react';
import './App.css';

import Router from './config/Router';

// import ShoppingList from './screens/ShoppingList';
// import Products from './screens/products/Products';
// import Detail from './screens/products/Detail';
// import Categories from './screens/categories/Categories';
// import Admin from './screens/admin/Admin';


class App extends Component {
  
  render() {
    return (
      <div className="App">

      <Router/>
      {/*
        <ShoppingList/>
        <Products/>
        <Detail/>
        <Categories/>
        <Admin/>
      */}

      </div>
    );
  }
}

export default App;
