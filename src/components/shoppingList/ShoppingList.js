// Usage:
// <ShoppingList />

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../../assets/css/General.css';
import ProductItem from '../products/ProductItem';
import LastModified from '../data-sync/LastModified';

class ShoppingList extends Component {
    mockItem={
        key:"key",
        product: {
            label: 'mockProduct'
        },
        color: 'green'
    }
    
    constructor() {
        super();
        this.state={
            hideCart: true
        }
        this.toggleRemoveIcons = this.toggleRemoveIcons.bind(this);
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
                        <FontAwesome name="pencil" className={"styled-pencil " + (this.state.hideCart ? 'gray': 'red')}  
                                onClick={this.toggleRemoveIcons}/>
                    </div>
                    <div className="flex space-between">
                        <div className="section-title"> ShoppingList </div>
                    </div>
                </div>
            </div>
            <ProductItem key={this.mockItem.key} product={this.mockItem.product} color={this.mockItem.color} 
                        hideCart={this.state.hideCart}
                        showRemoveCart="true"/>
        </div>
        );
    }
}

export default ShoppingList;
