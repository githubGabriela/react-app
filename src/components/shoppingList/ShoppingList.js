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
            hideCrudIcons: true,
            lastModified: undefined
        }
        this.toggleCrudIcons = this.toggleCrudIcons.bind(this);
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


    toggleCrudIcons() {
        let toggleHide = !this.state.hideCrudIcons;

        this.setState({
            hideCrudIcons: toggleHide
        });
    }

    render() {
        let showClearButton = () => {
            return (
                <div className="display-inline shopping-clear">
                    {!this.state.hideCrudIcons ? 
                        <button onClick={(event) => {Utils.preventDefault(event); DataSource.clearShoppingList(this.state.items)}}> Clear </button> 
                    : null
                    }
                 </div>
            )
        };

        let showEditIcon = () => {
            return (
                <div>
                        {this.state.items.length > 0 ?
                            <div className="flex space-between">
                                <div onClick={this.toggleCrudIcons}> EDIT
                                    {showClearButton()}
                                 </div>
                                <ExportList categories={this.state.categories} products={this.state.items}/>                                
                            </div>
                        : null
                        }
                    </div>
            )
        };

        let showItems = () => {
            return (
                <div>
                    {this.state.items.map((item) => {
                            return (
                                <ProductItem key={item.key}
                                            product={item}
                                            color={item.value.color}
                                            showOnlyRemoveCart={true}
                                            hideIcons={this.state.hideCrudIcons}
                                            removeFromShoppingList={(item)=> {DataSource.removeFromShoppingList(item); DataSource.addToHistory(item)}}/>
                            )
                        })}
                </div>
            );
        }

        let showFilteringSorting = () => {
            return (
                <FilteringAndSorting showComponent={this.state.items.length > 0}
                                 dataType={Constants.SHOPPING_LIST}
                                 items={this.state.items} 
                                 initialItems={this.state.initialItems}
                                 setFilteredItems = {items => this.setState({items: items})}/>
            );
        }

        return (
        <div>
            <div className="section-header">
                <div className="full-width">
                    <div>
                        <LastModified lastModified={this.state.lastModified}/>
                    </div>
                    <div className="flex space-between">
                        <div className="section-title">
                            <div className="align-left"> {showEditIcon()}</div>
                            {Constants.TITLES.SHOPPING_LIST}
                            {showFilteringSorting()}
                        </div>
                    </div>
                </div>
            </div>
            {showItems()}
        </div>
        );
    }
}

export default ShoppingList;
