// Usage:
// <ProductNameEdit item={item}></ItemEdit>

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { dbDataProducts } from '../../../../config/constants';
import { hocItemNameEdit } from '../../hoc/HocItemNameEdit';

import '../../../../assets/css/General.css';

class ProductEdit extends Component {
    constructor(){
        super();
        this.confirm = this.confirm.bind(this);
    }
    
    confirm(event) {
        event.preventDefault();
        let key = this.props.item.key;
        if(key){
            dbDataProducts.child(key).update({name : this.props.nameToUpdate}); 
        }
    }

    render() {
        return (
            <FontAwesome name="check" className="icon-with-padding" onClick={this.confirm}/>
        );
    }
}


const ProductNameEdit = hocItemNameEdit(
    ProductEdit,
    (getInitialInput) => { 
        return {
                key: '',
                value: ''
            }
        }
    
);

export default ProductNameEdit;