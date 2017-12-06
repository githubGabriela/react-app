import React, { Component } from 'react';
import './ShoppingList.css';
import HandleData from '../config/HandleData';

class ShoppingList extends Component {
    goToDetail = (item) => {
    };

    render() {
        return (
        <div className="Container">
            <div> ShoppingList with css </div>
            <HandleData inputProperty="input from shopping list"/>
             
        </div>
        );
    }
}

export default ShoppingList;
