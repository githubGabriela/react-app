// Usage:
// <AdminProducts/>

import React, { Component } from 'react';

import { hocItems } from '../../hoc/HocItems';
import ProductsList from './ProductsList';
import ProductCreate from '../crud/ProductCreate';

import '../../../../assets/css/General.css';

class Products extends Component {
   
    render() {
        return (
            <div>
                <div className="product-create">
                    <ProductCreate categories={this.props.categories}/> 
                    <ProductsList sectionTitle="Products" items={this.props.products}/>
                </div>
            </div>
        );
    }
}

const AdminProducts = hocItems(Products);

export default AdminProducts;
