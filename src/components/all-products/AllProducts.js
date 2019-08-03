// Usage:
// <AllProducts/>

import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

import '../../App.css';
import Settings from '../common/Settings';
import ProductItem from "./ProductItem";

class AllProducts extends Component {
    filter;
    constructor() {
        super();
        this.state = {
            products: [],
            filteredProducts: [],
            showSettingsFields: true
        }
    }

    componentDidMount() {
        this.getProductsByCategory();
    }

    getProductsByCategory() {
        DataSource.getOrderProductsByCategory(items => {
            this.setState({
                products: items,
                filteredProducts: items
            });
        });
        // https://www.youtube.com/watch?v=Cy5MjeXZobE - infinite scroll
    }

    render() {
        let showFilteringSorting = () => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <FilteringAndSorting
                            dataType={Constants.PRODUCTS}
                            hideOrdering={true}
                            items={this.state.filteredProducts}
                            initialItems={this.state.products}
                            setFilteredItems={items => this.setState({ filteredProducts: items })} />
                        : null
                    }
                </div>
            );
        }

        let showSettings = () => {
            return (
                <div className="section-header">
                    <div className="section-title">
                        {showFilteringSorting()}
                        <div className="flex space-between">
                            <Settings toggleSettings={() => this.setState({ showSettingsFields: !this.state.showSettingsFields })} />
                        </div>
                    </div>
                </div>
            );
        }

        let showProducts = () => {
            return (
                <div>
                    {this.state.filteredProducts.map(product => {
                        return (
                            <div key={product.key} >
                                <div className="accordion-header">
                                    <div>
                                        <ProductItem key={product.key}
                                                     product={product}
                                                     color={product.value.categoryColor}
                                                     addToShoppingList={(item)=> DataSource.addToShoppingList(item)}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            );
        }

        return (
            <div>
                {showProducts()}
                {showSettings()}
            </div>
        )
    }
}

export default AllProducts;
