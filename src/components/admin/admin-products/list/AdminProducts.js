// Usage:
// <AdminProducts />

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import ProductsList from '../list/ProductsList';
import ProductCreate from '../crud/ProductCreate';
import { hocItems } from '../../hoc/HocItems';

import '../../../../assets/css/General.css';

class Products extends Component {

    render() {
        return (
            <div>
                <div> Products </div>
{/* 
                <ProductCreate selectedCategory='categoryTest'/>
                <ProductsList sectionTitle='categoryTest' 
                               items={this.props.products}/> */}

                {/* <Dropdown options={this.props.categories} 
                        value={this.props.selectedCategory} 
                        onChange={(event) => hocItems.selectedCategory.onChange} placeholder="Select a category" />
                {
                    this.props.selectedCategory ? 
                    

                    <div> 
                        <ProductCreate selectedCategory={this.props.selectedCategory}/>
                        <ProductsList sectionTitle={this.props.selectedCategory} 
                               items={this.props.products}/>
                        </div>

                        
                    :           
                    <div>No category selected</div>
                } */}
            </div>
        )
    }
}

const AdminProducts = hocItems(Products);

export default AdminProducts;
