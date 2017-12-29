// Usage:
// <Products/>

import React, { Component } from 'react';

import { dbDataProducts, dbDataShoppingList, dbDataCategories } from '../../config/constants';
import CollapseSections from '../collapse/CollapseSections';
import ProductItem from './ProductItem';

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
        dbDataProducts.orderByChild('category').on('value', snap => {
            let items = [];
            snap.forEach(childSnap => {
                items.push({key: childSnap.key, value: childSnap.val()});
            });
            this.setState({
                items: items
            })
        });
    }

    toggleSection(key){
        this.setState({
            showSectionForKey: key
        });
    }

    addToShopping(item){
        if(item && item.value){
            dbDataShoppingList.orderByChild('name').equalTo(item.value.name).once('value', snap=> {
                let exists = snap.val();
                if(!exists){
                    dbDataShoppingList.push(item.value);
                }
            });
           
        }
    }

    render() {
        return (
            <div>
                <div className="section-header">
                    <div className="section-title"> All Products </div>
                    <CollapseSections />
                </div>
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
