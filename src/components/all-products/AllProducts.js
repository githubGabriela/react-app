// Usage:
// <AllProducts/>

import React, { Component } from 'react';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import CollapseSections from '../collapse/CollapseSections';
import ProductItem from './ProductItem';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

class AllProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            initialItems:[],
            showSectionForKey : undefined
        }
        this.toggleSection = this.toggleSection.bind(this);
    }

    componentDidMount() {
        this.getProductsByCategory();
    }

    getProductsByCategory(){
        DataSource.getProductsByCategory( items => {
            this.setState({
                items: items,
                initialItems: items
            });
        });
    }

    toggleSection(key) {
        this.setState({
            showSectionForKey: key
        });
    }

   
    render() {
        return (
            <div>
                <div className="section-header">
                    <div className="section-title">{Constants.TITLES.ALL_PRODUCTS}</div>
                    <CollapseSections />
                </div>
                <FilteringAndSorting showComponent={this.state.items.length > 0}
                                 dataType={Constants.PRODUCTS}
                                 items={this.state.items} 
                                 initialItems={this.state.initialItems}
                                 setFilteredItems = {items => this.setState({items: items})}/>
                {this.state.items.map((item) => {
                    return (
                        <ProductItem key={item.key}
                                            product={item}
                                            color={item.value.color}
                                            addToShoppingList={(item)=> DataSource.addToShoppingList(item)}/>
                    )
                    
                })}
            </div>
        )
    }
}

export default AllProducts;
