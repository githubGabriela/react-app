import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { dbDataPro, dbDataProducts } from '../../../../config/constants';

import '../../../../assets/css/General.css';

class ProductRemove extends Component {

    constructor(){
        super();
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(item){
        if(item.key){
            dbDataProducts.child(item.key).remove();
        }
    }    

    render() {
        return (
            <div className="center-from-top icon-on-right">
            <FontAwesome name="close" onClick={()=> {this.removeItem(this.props.item)}}/>
        </div>
        );
    }
}

export default ProductRemove;
