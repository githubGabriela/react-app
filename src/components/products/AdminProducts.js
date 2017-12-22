// Usage:
// <AdminProducts />

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import '../../assets/css/General.css';

import Items from '../items/Items';
import ItemCreate from '../items/ItemCreate';
import { hocCategories } from '../categories/HocCategories';

class Products extends Component {

    render() {
        return (
            <div>
                <div> Products </div>
                <Dropdown options={this.props.categories} 
                        value={this.props.selectedCategory} 
                        onChange={(event) => hocCategories.selectedCategory.onChange} placeholder="Select a category" />
                {
                    this.props.selectedCategory ? 
                    <div> 
                        <ItemCreate placeholder='Add a new product' isProduct='true' entryToCreate={this.props.selectedCategory}/>
                        <Items sectionTitle={this.props.selectedCategory.label} items={this.props.selectedCategory.products}/>
                        </div>
                    :
                    <div>No category selected</div>
                }
            </div>
        )
    }
}

const AdminProducts = hocCategories(Products);

export default AdminProducts;
