// Usage:
// <ShoppingList />

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import * as Utils from '../../utils/Utils';
import '../../assets/css/General.css';
import ProductItem from '../all-products/ProductItem';
import LastModified from '../data-sync/LastModified';
import ExportList from './ExportList';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';

class ShoppingList extends Component {
    constructor() {
        super();
        this.state={
            items: [],
            initialItems: [],
            categories: [],
            showCrudIcons: false,
            lastModified: undefined
        }
        this.toggleRemoveIcons = this.toggleRemoveIcons.bind(this);
    }

    componentDidMount() {
        this.getShoppingList();
        this.getLastModified();
        this.getCategoriesNames();
    }

    getShoppingList(){
        DataSource.getShoppingList(items => {
            this.setState({
                items: items,
                initialItems: items
            });
        });
    }
    
    getLastModified(){
        DataSource.getLastModified( result => {
            this.setState({
                lastModified : result
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


    toggleRemoveIcons() {
        this.setState({
            showCrudIcons: !this.state.showCrudIcons
        });
    }

    render() {
        return (
        <div>
            <div className="section-header">
                <div className="full-width">
                    <div className="flex space-between">
                        <LastModified lastModified={this.state.lastModified}/>
                        {this.state.items.length > 0 ?
                            <div>
                                <div onClick={this.toggleRemoveIcons}> EDIT </div>
                                         {this.state.showCrudIcons ? 
                                            <button onClick={(event) => {Utils.preventDefault(event); DataSource.clearShoppingList(this.state.items)}}> Clear </button> 
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
            <FilteringAndSorting showComponent={this.state.items.length > 0}
                                 dataType={Constants.SHOPPING_LIST}
                                 items={this.state.items} 
                                 initialItems={this.state.initialItems}
                                 setFilteredItems = {items => this.setState({items: items})}/>
        
            {this.state.items.map((item) => {
                  return (
                    <ProductItem key={item.key}
                                 product={item}
                                 color={item.value.color}
                                 showRemoveCart={this.state.showCrudIcons}
                                 showCrudIcons={this.state.showCrudIcons}
                                 removeFromShoppingList={(item)=> {DataSource.removeFromShoppingList(item); DataSource.addToHistory(item)}}/>
                  )
             })}

        </div>
        );
    }
}

export default ShoppingList;
