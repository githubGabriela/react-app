import React, { Component } from 'react';

import Items from '../items/Items';
import CategoryCreate from '../categories/CategoryCreate';
import { hocCategories } from './HocCategories';
import '../../assets/css/General.css';

class Categories extends Component {
    render() {
        return (
            <div className="container-with-padding">
                <div>Categories</div>
                <Items items={this.props.categories} propertyToShow='category'/>
                <CategoryCreate/>
            </div>
        );
    }
}

const AdminCategories = hocCategories(Categories);

export default AdminCategories;
