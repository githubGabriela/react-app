// Usage:
// <ShoppingList />

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import * as DataSource from '../../config/DataSource';
import '../../assets/css/General.css';
import ProductItem from '../products/ProductItem';
import LastModified from '../data-sync/LastModified';
import ExportList from './ExportList';

class ShoppingList extends Component {
    constructor() {
        super();
        this.state={
            items: [],
            categories: [],
            hideCart: true
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
            hideCart: !this.state.hideCart
        });
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
                                <FontAwesome name="pencil" className={"styled-pencil " + (this.state.hideCart ? 'gray': 'red')}  
                                         onClick={this.toggleRemoveIcons}/>
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
            {this.state.items.map((item) => {
                  return (
                    <ProductItem key={item.key}
                                 product={item}
                                 color={item.value.color}
                                 showRemoveCart="true"
                                 hideCart={this.state.hideCart}
                                 removeFromShoppingList={(item)=> this.removeFromShopping(item)}/>
                  )
                  
             })}

        </div>
        );
    }
}

export default ShoppingList;
