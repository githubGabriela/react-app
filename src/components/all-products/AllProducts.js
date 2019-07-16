// Usage:
// <AllProducts/>

import React, { Component } from 'react';
import _ from 'lodash';

import * as DataSource from '../../config/DataSource';
import '../../assets/css/General.css';

class AllProducts extends Component {
    filter;
    constructor() {
        super();
        this.state = {
            products: [],
            filteredProducts: []
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
        let showHeader = () => {
            return (
                <div className="section-header">
                    <div className="section-title">

                        <div className="flex space-between">
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
