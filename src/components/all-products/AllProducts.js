// Usage:
// <AllProducts/>

import React, { Component } from 'react';
import _ from 'lodash';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

import '../../assets/css/General.css';
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

    search(event) {
        const filter = event.target.value;
        let filtered = _.filter(this.state.products, item => {
            if (JSON.stringify(item.value).indexOf(filter) !== -1) {
                return item;
            }
        });
        this.setFilteredProducts(filtered);
    }

    setFilteredProducts(products) {
        this.state.filteredProducts = products;
        this.setState({
            filteredProducts: products
        })
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

        let showHeader = () => {
            return (
                <div className="section-header">
                    <div className="section-title">
                        {showFilteringSorting()}
                        <div className="flex space-between">
                            <Settings toggleSettings={() => this.setState({ showSettingsFields: !this.state.showSettingsFields })} />
                            <input type="text" placeholder="Search" onChange={this.search.bind(this)}></input>
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
                                <div className="accordion-header flex space-between">
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
                {showHeader()}
                {showProducts()}
            </div>
        )
    }
}

export default AllProducts;
