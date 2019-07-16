// Usage:
// <AllProducts/>

import React, { Component } from 'react';
import _ from 'lodash';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

import '../../assets/css/General.css';
import { getProductsByCategory } from '../../config/DataSource';
import Settings from '../common/Settings';

class AllProducts extends Component {
    filter;
    constructor() {
        super();
        this.state = {
            categories: [],
            products: [],
            filteredProducts: [],
            showSettingsFields: false
        }
    }

    componentDidMount() {
        this.getCategories();
        this.getProductsByCategory();
    }

    getCategories() {
        DataSource.getCategories(categories => {
            this.setState({
                categories: categories,
                defaultCategory: categories[0]
            });
        });
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

                        <div className="flex space-between">
                            <Settings toggleSettings={() => this.setState({ showSettingsFields: !this.state.showSettingsFields })} />
                        </div>
                        <div>
                            {/* {showFilteringSorting()} */}
                        </div>
                    </div>
                </div>
            );
        }

        let showProducts = () => {
            return (
                <div>
                    <input type="text" placeholder="Search" onChange={this.search.bind(this)}></input>
                    {this.state.filteredProducts.map(product => {
                        return (
                            <div key={product.key} >
                                <div className="accordion-header flex space-between">
                                    <div>
                                        <div>{product.value.photo}</div>
                                        <label>{product.value.name}</label>
                                        <div>
                                            <label>Category: {product.value.categoryName}</label>
                                        </div>
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
