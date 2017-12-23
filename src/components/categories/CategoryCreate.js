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
            <div className="flex space-between">
               <div className="color-picker-container">
                    <div className="color-bullet center-margin-from-top"  onClick={this.togglePopup}></div>
                    <ColorPopup showPopup={this.state.showPopup}/>
               </div>
               <div className="full-width">
                    <ItemCreate placeholder='Add a category' propertyToShow='category' color={this.state.color}/>
               </div>
            </div>
        );
    }
}

export default CategoryCreate;
