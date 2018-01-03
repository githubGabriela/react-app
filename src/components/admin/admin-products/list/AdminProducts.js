// Usage:
// <AdminProducts/>

import React, { Component } from 'react';

import * as Constants from '../../../../utils/Constants';
import * as DataSource from '../../../../config/DataSource';
import ProductsList from './ProductsList';
import ProductCreateEdit from '../crud/ProductCreateEdit';
import FilteringAndSorting from '../../../filtering-sorting/FilteringAndSorting';

import '../../../../assets/css/General.css';

class AdminProducts extends Component {
    constructor(){
        super();
        this.state = {
            categories : [],
            products: [],
            initialProducts: []
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
                    products : items,
                    initialProducts: items
                });
            });
        }

    render() {
        return (
            <div>
                <div className="product-create">
                    <ProductCreateEdit type="create" popupTitle={Constants.TITLES.CREATE}/>
                    <FilteringAndSorting dataType={Constants.PRODUCTS}
                                 items={this.state.products} 
                                 initialItems = {this.state.initialProducts}
                                 setFilteredItems = {items => this.setState({products: items})}/>
                    <ProductsList sectionTitle={Constants.TITLES.PRODUCTS} items={this.state.products}/>
                </div>
            </div>
        );
    }
}

export default AdminProducts;
