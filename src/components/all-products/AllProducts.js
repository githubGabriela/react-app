// Usage:
// <AllProducts/>

import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

import '../../assets/css/General.css';
import { getProductsByCategory } from '../../config/DataSource';
import Settings from '../common/Settings';


class AllProducts extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            initialItems: [],
            showSettingsFields: false
        }
    }

    componentDidMount() {
        this.getProductsByCategory();
    }

    getProductsByCategory() {
        DataSource.getOrderProductsByCategory(items => {
            console.log("items", items);
            this.setState({
                products: items,
                initialItems: items
            })
        });
    }


    render() {
        let showFilteringSorting = () => {
            return (
                <div>
                    {this.state.showSettingsFields ?
                        <FilteringAndSorting
                            dataType={Constants.PRODUCTS}
                            hideOrdering={true}
                            items={this.state.products}
                            initialItems={this.state.initialItems}
                            setFilteredItems={products => this.setState({ products: products })} />
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
                            {showFilteringSorting()}
                        </div>
                    </div>
                </div>
            );
        }

        let showProducts = () => {
            return (
                <div>
                    {this.state.products.map(product => {
                        return (
                            <div key={product.key} >
                                <div className="accordion-header flex space-between">
                                    <div>
                                        <div>{product.value.photo}</div>
                                        <label>{product.value.name}</label>
                                        <div>
                                            <label>Category: {product.value.category.name}</label>
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
