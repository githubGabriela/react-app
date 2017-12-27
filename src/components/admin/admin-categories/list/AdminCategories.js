// Usage:
// <AdminCategories/>

import React, { Component } from 'react';

import { hocItems } from '../../hoc/HocItems';
import CategoriesList from './CategoriesList';
import CategoryCreate from '../crud/CategoryCreate';

import '../../../../assets/css/General.css';

class Categories extends Component {
    render() {
        return (
            <div>
                <div className="category-create">
                    <CategoryCreate/>
                </div>
                <CategoriesList sectionTitle="Categories" items={this.props.categories} propertyToShow='category'/>
            </div>
        );
    }
}

const AdminCategories = hocItems(Categories);

export default AdminCategories;
