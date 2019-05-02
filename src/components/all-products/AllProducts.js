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
   filters = {};

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
            console.log("categories", categories);
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
        // https://www.youtube.com/watch?v=ZszeF3laTc8
        // https://www.youtube.com/watch?v=Cy5MjeXZobE
    }

    
    searchByCategory(event){
        console.log(event.target.value);
        this.removeFilter();
        this.applyFilters(event.target.value, 'category');
    }
    
    searchByProductName(event) {
        this.applyFilters(event.target.value, 'productName');
    }

    applyFilters(filterValue, filterBy) {
        if (filterValue && filterValue !== "undefined") {
            let filtered = _.filter(this.state.filteredProducts, item => {
                switch (filterBy) {
                    case 'category':
                        if (item.value.category.name.indexOf(filterValue) !== -1) {
                            return item;
                        }
                        break;
                    case 'productName':
                        if (item.value.name.indexOf(filterValue) !== -1) {
                            return item;
                        }
                        break;
                    default:
                        break;
                }
            });
            this.setState({
                filteredProducts: filtered
            });
        } else {
            this.removeFilter();
        }
    }

    removeFilter() {
        this.setState({
           filteredProducts: this.state.products
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
                            {showFilteringSorting()}
                        </div>
                    </div>
                </div>
            );
        }

        let showProducts = () => {
            return (
                <div>
                    <select onChange={this.searchByCategory.bind(this)}>
                        <option value="undefined">Select category</option>
                        {this.state.categories.map(category => {
                            return (
                            <option value={category.value.name} key={category.key}>{category.value.name}</option>
                            )
                        })}
                    </select>
                    
                    <input type="text" placeholder="Search by product" onChange={this.searchByProductName.bind(this)}></input>
                    {this.state.filteredProducts.map(product => {
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
