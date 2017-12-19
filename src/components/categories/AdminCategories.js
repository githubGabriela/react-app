import React, { Component } from 'react';

import Items from '../items/Items';
import CategoryCreate from '../categories/CategoryCreate';
import { hocCategories } from './HocCategories';

class Categories extends Component {
    render() {
        return (
            <div className="Container">
                <div>Categories</div>
                <Items items={this.props.categories} propertyToShow='category'/>
                <CategoryCreate/>
            </div>
        );
    }
}

const AdminCategories = hocCategories(Categories);

export default AdminCategories;
