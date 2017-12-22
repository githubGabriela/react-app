// Usage:
// <CategoryCreate/>

import React, { Component } from 'react';
import ColorPopup from '../popups/ColorPopup';

import ItemCreate from '../items/ItemCreate';

class CategoryCreate extends Component {
    constructor() {
        super();
        this.state = {
            color: '',
            showPopup: false
        }
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        })
        console.log(this.state.showPopup);
    }

    render() {
        return (
            <div>
                <ItemCreate placeholder='Add a category' propertyToShow='category' color={this.state.color}/>
               <button onClick={this.togglePopup}> Show colorPicker </button>
               <ColorPopup showPopup={this.state.showPopup}/>
            </div>
        );
    }
}

export default CategoryCreate;
