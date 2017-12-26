// Usage:
// <AdminCategories/>

import React, { Component } from 'react';

import Items from '../../items/Items';
import CategoryCreate from '../crud/CategoryCreate';
import { hocItems } from '../../hoc/HocItems';

import '../../../../assets/css/General.css';

class Categories extends Component {
    render() {
        return (
            <div>
                <div className="category-create">
                    <CategoryCreate/>
                </div>
                <Items sectionTitle="Categories" items={this.props.categories} propertyToShow='category'/>
            </div>
        );
    }
}

const AdminCategories = hocItems(Categories);

export default AdminCategories;
