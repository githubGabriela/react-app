// Usage:
// <CategoryCreate/>

import React, { Component } from 'react';
import ColorPopup from '../popups/ColorPopup';

import ItemCreate from '../items/ItemCreate';

class CategoryCreate extends Component {
    constructor() {
        super();
        this.state = {
            color: ''
        }
    }

    render() {
        return (
            <div>
                <ItemCreate placeholder='Add a category' propertyToShow='category' color={this.state.color}/>
                <ColorPopup />
            </div>
        );
    }
}

export default CategoryCreate;
