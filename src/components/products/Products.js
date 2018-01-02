// Usage:
// <Products/>

import React, { Component } from 'react';

import * as DataSource from '../../config/DataSource';
import CollapseSections from '../collapse/CollapseSections';
import ProductItem from './ProductItem';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            showSectionForKey : undefined
        }
        this.toggleSection = this.toggleSection.bind(this);
        this.addToShopping = this.addToShopping.bind(this);
    }

    componentDidMount() {
        this.getProductsByCategory();
    }

    getProductsByCategory(){
        DataSource.getProductsByCategory( items => {
            this.setState({
                items: items
            });
        });
    }

    toggleSection(key){
        this.setState({
            showSectionForKey: key
        });
    }

    addToShopping(item){
        DataSource.addToShoppingList(item);
    }

    render() {
        return (
            <div>
                <div className="section-header">
                    <div className="section-title"> All Products </div>
                    <CollapseSections />
                </div>
                <FilteringAndSorting dataType='products' 
                                 items={this.state.items} 
                                 setFilteredItems = {items => this.setState({items: items})}/>
                {this.state.items.map((item) => {
                    return (
                        <ProductItem key={item.key}
                                            product={item}
                                            color={item.value.color}
                                            addToShoppingList={(item)=> this.addToShopping(item)}/>
                    )
                    
                })}
            </div>
        )
    }
}

export default Products;
