// Usage:
// <ProductNameCreate placeholder='Add a category' dbEntryName='category' color={this.state.color}/>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { dbDataProducts } from '../../../../config/constants';
import { hocItemNameCreate } from '../../hoc/HocItemNameCreate';

class ProductName extends Component {

    constructor() {
        super();
        this.pushProductToDb = this.pushProductToDb.bind(this);
    }

    pushProductToDb(event) {
        event.preventDefault();
        let product = { 
            name:this.props.nameToUpdate,
            category: this.props.categoryForProduct
        }

        console.log(product);
        dbDataProducts.push(
          product
        ); 
   }
   
    render() {
        return (
            <FontAwesome name="check" className="icon-with-padding" onClick={this.pushProductToDb}/>
        );
    }
}


const ProductNameCreate = hocItemNameCreate(
    ProductName,
    (getInitialInput) => { 
        return {
                key: '',
                value: ''
            }
        }
    
);

export default ProductNameCreate;
