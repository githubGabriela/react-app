// Usage:
// <ShoppingList />

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import '../../assets/css/General.css';
import ProductItem from '../products/ProductItem';
import LastModified from '../data-sync/LastModified';
import ExportList from './ExportList';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

class ShoppingList extends Component {
    constructor() {
        super();
        this.state={
            items: [],
            categories: [],
            showCrudIcons: false
        }
        this.toggleRemoveIcons = this.toggleRemoveIcons.bind(this);
    }

    componentDidMount() {
        this.getShoppingList();
        this.getCategoriesNames();
    }

    getShoppingList(){
        DataSource.getShoppingList(items => {
            this.setState({
                items: items
            });
        });
    }
    getCategoriesNames(){
        DataSource.getCategoriesNames(items => {
            this.setState({
                categories: items
            });
        });
    }

    removeFromShopping(item){
        DataSource.removeFromShoppingList(item);
        DataSource.addToHistory(item);
    }

    toggleRemoveIcons() {
        this.setState({
            showCrudIcons: !this.state.showCrudIcons
        });
    }

    clearShoppingList(event){
        event.preventDefault();
        DataSource.clearShoppingList(this.state.items);
    }

    render() {
        return (
        <div>
            <div className="section-header">
                <div className="full-width">
                    <div className="flex space-between">
                        <LastModified />
                        {this.state.items.length > 0 ?
                            <div>
                                <FontAwesome name="pencil" className={"styled-pencil " + (this.state.showCrudIcons ? 'gray': 'red')}  
                                         onClick={this.toggleRemoveIcons}/>
                                         {this.state.showCrudIcons ? 
                                            <button onClick={(event) => this.clearShoppingList(event)}> Clear </button> 
                                         : null
                                         }
                                <ExportList categories={this.state.categories} products={this.state.items}/>                                
                            </div>
                        : null
                        }
                    </div>
                    <div className="flex space-between">
                        <div className="section-title"> Shopping List </div>
                    </div>
                </div>
            </div>
            <FilteringAndSorting dataType={Constants.SHOPPING_LIST}
                                 items={this.state.items} 
                                 setFilteredItems = {items => this.setState({items: items})}/>
        
            {this.state.items.map((item) => {
                  return (
                    <ProductItem key={item.key}
                                 product={item}
                                 color={item.value.color}
                                 showRemoveCart="true"
                                 showCrudIcons={this.state.showCrudIcons}
                                 removeFromShoppingList={(item)=> this.removeFromShopping(item)}/>
                  )
                  
             })}

        </div>
        );
    }
}

export default ShoppingList;
