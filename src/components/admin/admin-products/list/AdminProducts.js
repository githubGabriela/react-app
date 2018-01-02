// Usage:
// <AdminProducts/>

import React, { Component } from 'react';

import * as DataSource from '../../../../config/DataSource';
import ProductsList from './ProductsList';
import ProductCreate from '../crud/ProductCreate';

import '../../../../assets/css/General.css';

class AdminProducts extends Component {
    constructor(){
        super();
        this.state = {
            categories : [],
            products: []
        }
    }

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

     getCategories() {
            DataSource.getCategories( items => {
                this.setState({
                    categories : items
                });
            });
        }

        getProducts() {
            DataSource.getProducts( items => {
                this.setState({
                    products : items
                });
            });
        }

    render() {
        return (
            <div>
                <div className="product-create">
                    <ProductCreate categories={this.state.categories}/> 
                    <ProductsList sectionTitle="Products" items={this.state.products}/>
                </div>
            </div>
        );
    }
}

export default AdminProducts;
