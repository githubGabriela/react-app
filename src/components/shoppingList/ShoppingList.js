// Usage:
// <ShoppingList />

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as Constants from '../../utils/Constants';
import * as DataSource from '../../config/DataSource';
import * as Utils from '../../utils/Utils';
import '../../assets/css/General.scss';
import ProductItem from '../all-products/ProductItem';
import LastModified from '../data-sync/LastModified';
import ExportList from './ExportList';
import FilteringAndSorting from '../filtering-sorting/FilteringAndSorting';
import Settings from '../common/Settings';

class ShoppingList extends Component {
    constructor() {
        super();
        this.state={
            items: [],
            initialItems: [],
            categories: [],
            lastModified: undefined,
            showSettingsFields: false
        }
    }

    componentDidMount() {
        this.getShoppingList();
        this.getLastModified();
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

    // getCategoriesNames(){
    //     DataSource.getCategoriesNames(items => {
    //         this.setState({
    //             categories: items
    //         });
    //     });
    // }

    toggleSettingsFields(){
        let toggle = !this.state.showSettingsFields;
        this.setState({
            showSettingsFields: toggle
        });
    }

    render() {
        let showClearButton = () => {
            return (
                <div>
                    {this.state.showSettingsFields ? 
                        <div className="align-right center-margin-from-top">
                            <button onClick={(event) => {Utils.preventDefault(event); DataSource.clearShoppingList(this.state.items)}}> Clear </button> 
                        </div>
                    : null
                    }
                 </div>
            )
        };

        let showExport = () => {
            return (
                <div>
                        {this.state.items.length > 0 ?
                            <div className="flex space-between">
                               <ExportList categories={this.state.categories} products={this.state.items}/>                              
                            </div>                            
                         : null
                        } 
                    </div>
            )
        }

        let showItems = () => {
            return (
                <div>
                    {this.state.items.map((item) => {
                            return (
                                <ProductItem key={item.key}
                                            product={item}
                                            color={item.value.color}
                                            showOnlyRemoveCart={true}
                                            hideIcons={!this.state.showSettingsFields}
                                            removeFromShoppingList={(item)=> {DataSource.removeFromShoppingList(item); DataSource.addToHistory(item)}}/>
                            )
                        })}
                </div>
            );
        }

        let showFilteringSorting = () => {
            return (
                <div>
                { this.state.showSettingsFields ? 
                <FilteringAndSorting showComponent={this.state.items.length > 0}
                                 dataType={Constants.SHOPPING_BASKET}
                                 items={this.state.items} 
                                 initialItems={this.state.initialItems}
                                 setFilteredItems = {items => this.setState({items: items})}/>
                : null 
                }
                </div>
            );
        }

        let showSettings = () => {
            return (
                <div className="footer">
                    <div className="full-width">
                        <div className="flex space-between">
                            <LastModified lastModified={this.state.lastModified}/>
                            <Settings toggleSettings={(event) => this.toggleSettingsFields(event)}/>
                        </div>
                        <div className="flex space-between">
                            <div>
                                {showExport()}
                                {showFilteringSorting()}
                                {showClearButton()}
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
        <div>
            {showItems()}
            {showSettings()}
        </div>
        );
    }
}

export default ShoppingList;
