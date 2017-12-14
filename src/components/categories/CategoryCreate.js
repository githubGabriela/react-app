import React, { Component } from 'react';

import ItemCreate from '../items/ItemCreate';

class CategoryCreate extends Component {
    render() {
        return (
            <ItemCreate placeholder='Add a category' propertyToShow='category'/>
        );
    }
}

export default CategoryCreate;
